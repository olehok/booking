import { Row, Col } from "antd";
import HotelCard from "./HotelCard";

export default function HotelsGrid({ hotels }) {
  return (
    <Row gutter={[24, 36]}>
      {hotels.map((hotel) => (
        <Col key={hotel.id} xs={24} sm={12}>
          <HotelCard hotel={hotel} />
        </Col>
      ))}
    </Row>
  );
}
