import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Pagination,
  Spin,
  Typography,
  Space,
  Select,
  Button,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useDebounce from "../hooks/useDebounce";
import HotelsGrid from "../components/HotelsGrid";
import useScrollPersistence from "../hooks/useScrollPersistence";

const { Text, Link } = Typography;

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get("city");
  const scrollKey = `hotelsScroll-${city}`;

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const debouncedSearch = useDebounce(searchValue, 700);

  const { hotels, loading, error, total } = useSelector(
    (state) => state.hotels,
  );

  const hotelsSafe = Array.isArray(hotels) ? hotels : [];
  const urlSearch = searchParams.get("search") || "";

  const markNewSearch = useScrollPersistence(scrollKey, hotelsSafe.length);

  useEffect(() => {
    setSearchValue(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    if (debouncedSearch !== urlSearch) {
      const params = Object.fromEntries(searchParams.entries());

      setSearchParams({
        ...params,
        search: debouncedSearch || "",
        page: 1,
      });
      markNewSearch();
    }
  }, [debouncedSearch, urlSearch, searchParams, setSearchParams, markNewSearch]);

  const handlePageChange = (newPage) => {
    const params = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...params,
      page: newPage,
    });
  };

  const sort = searchParams.get("sort") || null;

  const handleSortChange = (value) => {
    const params = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...params,
      sort: value || "",
      page: 1,
    });
    markNewSearch();
  };

  return (
    <section className="hotel-list">
      <Space style={{ margin: "0 0.5rem 1rem" }}>
        <Input
          placeholder="Search hotel..."
          style={{ width: 250 }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button shape="circle" icon={<SearchOutlined />} />
      </Space>

      {loading && (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      )}

      {error && <p>Error: {error}</p>}

      {!loading && !error && !hotelsSafe.length && (
        <Space
          orientation="vertical"
          size="large"
          style={{ width: "100%", marginTop: 40 }}
          align="center"
        >
          <Text>
            {city ? (
              `No hotels found${city !== "all" ? ` in ${city}` : ""}.`
            ) : (
              <>
                Please select a{" "}
                <Link onClick={() => navigate("/search")}>city.</Link>
              </>
            )}
          </Text>
          {city !== "all" && (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                navigate("/hotels?city=all&page=1");
              }}
            >
              Show all hotels
            </Button>
          )}
        </Space>
      )}

      {!loading && !error && hotelsSafe.length > 0 && (
        <>
          <Select
            allowClear
            placeholder="Sort by rating"
            style={{ width: 150 }}
            value={sort}
            onChange={handleSortChange}
            options={[
              { value: "desc", label: "From high to low" },
              { value: "asc", label: "From low to high" },
            ]}
          />

          <HotelsGrid hotels={hotelsSafe} />

          <Pagination
            align="center"
            style={{ marginTop: 18 }}
            current={Number(searchParams.get("page")) || 1}
            total={total}
            pageSize={10}
            onChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}
