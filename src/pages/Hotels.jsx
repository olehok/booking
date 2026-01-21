import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Row, Col, Spin, Typography, Space } from "antd";
import HotelCard from "../components/HotelCard";
// import Container from "../components/Container";

export default function Hotels() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const { hotels, loading, error } = useSelector((state) => state.hotels);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!hotels.length) {
    return (
      <Space direction="vertical" size="large">
        <Typography.Text type="primary">No hotels found in {city}</Typography.Text>
      </Space>
    );
  }

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
    </section>
  );
}
