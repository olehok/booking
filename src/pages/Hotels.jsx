import { useSelector } from "react-redux";
import { Row, Col, Spin, Empty } from "antd";
import HotelCard from "../components/HotelCard";
import Container from "../components/Container";

export default function Hotels() {
  const { hotels, loading, error } = useSelector((state) => state.hotels);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!hotels.length) {
    return <Empty description="No hotels found" />;
  }

  return (
    <section>
      {/* <Container> */}
      <Row
        gutter={[24, 36]}
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 30px",
        }}
      >
        {hotels.map((hotel) => (
          <Col key={hotel.id} xs={24} sm={12} >
            <HotelCard {...hotel} />
          </Col>
        ))}
      </Row>
      {/* </Container> */}
    </section>
  );
}
