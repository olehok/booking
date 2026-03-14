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
import useDebounce from "../../hooks/useDebounce";
import HotelsGrid from "../../components/HotelsGrid/HotelsGrid";
import useScrollPersistence from "../../hooks/useScrollPersistence";
import { useTranslation } from "react-i18next";
import useWithLng from "../../hooks/useWithLng";
import styles from "./Hotels.module.scss";

const { Text, Link } = Typography;

export default function Hotels() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get("city");
  const scrollKey = `hotelsScroll-${city}`;
  const { withLng } = useWithLng();

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
        city: params.city || "all",
        search: debouncedSearch || "",
        page: 1,
      });
      markNewSearch();
    }
  }, [debouncedSearch, urlSearch, searchParams, setSearchParams]);

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
      city: params.city || "all",
      sort: value || "",
      page: 1,
    });
    markNewSearch();
  };

  return (
    <section>
      <h2 className="title">
        {t("hotels.title")}
      </h2>
      <Space className={styles.controls}>
        <Input
          allowClear
          placeholder={t("hotels.searchPlaceholder")}
          className={styles.searchInput}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button shape="circle" icon={<SearchOutlined />} />
      </Space>

      {loading && (
        <Spin size="large" className={styles.loading} />
      )}

      {error && (
        <p>
          {t("hotels.error")}: {error}
        </p>
      )}

      {!loading && !error && !hotelsSafe.length && (
        <Space
          orientation="vertical"
          size="large"
          className={styles.emptyState}
          align="center"
        >
          <Text>
            {city ? (
              t("hotels.noHotelsFound", {
                cityPart:
                  city !== "all"
                    ? t("hotels.noHotelsFoundIn", { city })
                    : "",
              })
            ) : (
              <>
                {t("hotels.pleaseSelectCity")}{" "}
                <Link onClick={() => navigate(withLng("/search"))}>
                  {t("hotels.city")}
                </Link>
                .
              </>
            )}
          </Text>
          {city !== "all" && (
            <Button
              color="primary"
              variant="outlined"
              className={styles.showAllButton}
              onClick={() => {
                navigate(`${withLng("/hotels")}?city=all&page=1`);
              }}
            >
              {t("hotels.showAll")}
            </Button>
          )}
        </Space>
      )}

      {!loading && !error && hotelsSafe.length > 0 && (
        <>
          <Select
            allowClear
            placeholder={t("hotels.sortByRating")}
            className={styles.sortSelect}
            value={sort}
            onChange={handleSortChange}
            options={[
              { value: "desc", label: t("hotels.sortHighToLow") },
              { value: "asc", label: t("hotels.sortLowToHigh") },
            ]}
          />

          <HotelsGrid hotels={hotelsSafe} />

          <Pagination
            align="center"
            className={styles.pagination}
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
