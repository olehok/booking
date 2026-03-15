import { Row, Col } from "antd";
import PropTypes from "prop-types";
import HotelCard from "../HotelCard/HotelCard";

export default function HotelsGrid({ hotels }) {
  const hotelsSafe = Array.isArray(hotels) ? hotels : [];

  return (
    <Row gutter={[24, 36]}>
      {hotelsSafe.map((hotel) => (
        <Col key={hotel.id} xs={24} sm={12} md={12} lg={12}>
          <HotelCard hotel={hotel} />
        </Col>
      ))}
    </Row>
  );
}

HotelsGrid.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string,
      country_code: PropTypes.string.isRequired,
      phone_number: PropTypes.string,
      website: PropTypes.string,
      hotel_rating: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
