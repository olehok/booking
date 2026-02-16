import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Pagination,
  Row,
  Col,
  Spin,
  Typography,
  Space,
  Select,
  Button,
} from "antd";
import useDebounce from "../hooks/useDebounce";
import HotelCard from "../components/HotelCard";

const { Text, Link } = Typography;

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get("city");
  const scrollKey = `hotelsScroll-${city}`;
  const { hotels, loading, error, total } = useSelector(
    (state) => state.hotels,
  );

  useEffect(() => {
    const savedPosition = localStorage.getItem(scrollKey);

    if (savedPosition) {
      window.scrollTo(0, Number(savedPosition));
    }
  }, [scrollKey]);

  useEffect(() => {
    const handleScroll = () => {
      localStorage.setItem(scrollKey, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollKey]);

  const hotelsSafe = Array.isArray(hotels) ? hotels : [];

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
  };

  if (loading) {
    return <Spin fullscreen size="large" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!hotelsSafe.length) {
    return (
      <Space
        orientation="vertical"
        size="large"
        style={{ width: "100%" }}
        align="center"
      >
        <Text>
          {city ? (
            `No hotels found in ${city}.`
          ) : (
            <>
              Please select a{" "}
              <Link onClick={() => navigate("/search")}>city.</Link>
            </>
          )}
        </Text>
        {city !== "all" && (
          <Button
            type="primary"
            onClick={() => {
              navigate("/hotels?city=all&page=1");
            }}
          >
            Show all hotels
          </Button>
        )}
      </Space>
    );
  }

  return (
    <section className="hotel-list">
      <Select
        allowClear
        placeholder="Sort by rating"
        style={{ width: 150, marginBottom: 18 }}
        value={sort}
        onChange={handleSortChange}
        options={[
          { value: "desc", label: "From high to low" },
          { value: "asc", label: "From low to high" },
        ]}
      />

      <Row gutter={[24, 36]}>
        {hotelsSafe.map((hotel) => (
          <Col key={hotel.id} xs={24} sm={12}>
            <HotelCard {...hotel} />
          </Col>
        ))}
      </Row>

      <Pagination
        align="center"
        style={{ marginTop: 18 }}
        current={Number(searchParams.get("page")) || 1}
        total={total}
        pageSize={10}
        onChange={handlePageChange}
      />
    </section>
  );
}
