import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Pagination, Row, Col, Spin, Typography, Space } from "antd";
import HotelCard from "../components/HotelCard";

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get("city");
  const { hotels, loading, error, total, page } = useSelector((state) => state.hotels);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!hotels.length) {
    return (
      <Space orientation="vertical" size="large">
        <Typography.Text type="primary">No hotels found in {city}</Typography.Text>
      </Space>
    );
  }

  const handlePageChange = (newPage) => {
    const params = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...params,
      page: newPage,
    });
  };


  return (
    <section>
      <Row
        gutter={[24, 36]}
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 30px",
        }}
      >
        {hotels.map((hotel) => (
          <Col key={hotel.id} xs={24} sm={12}>
            <HotelCard {...hotel} />
          </Col>
        ))}
      </Row>

      <Pagination
        style={{ marginTop: 20, textAlign: "center" }}
        current={Number(searchParams.get("page")) || 1}
        total={total}
        pageSize={10}
        onChange={handlePageChange}
      />
    </section>
  );
}
