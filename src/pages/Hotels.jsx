import { useSelector } from "react-redux";
import { Row, Col, Spin, Empty } from "antd";
import HotelCard from "../components/HotelCard";


export default function Hotels() {
  const { hotels, loading, error } = useSelector((state) => state.hotels);

  if (loading) {
    return <Spin size="large" />;;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!hotels.length) {
    return <Empty description="No hotels found" />;
  }

  return (
    // <section className="hotels">
    //   <div className="container">
    //     <h2>Our Hotels</h2>
    //     <p>
    //       Discover a wide range of hotels available for booking worldwide.
    //       Whether you're looking for luxury, budget-friendly, or boutique
    //       accommodations, we have options to suit every traveler's needs.
    //     </p>
    //     <div className="hotels-list">
    //       {hotels.map((hotel) => (
    //         <div key={hotel.id} className="hotel-card">
    //           <h3>{hotel.name}</h3>
    //           <p>City: {hotel.city}</p>
    //           <p>Address: {hotel.address}</p>
    //           <p>Rating: {hotel.hotel_rating}</p>
    //           <p>Phone number: {hotel.phone_number}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>

    <section>
      <Row gutter={[24, 24]}>
        {hotels.map((hotel) => (
          <Col key={hotel.id} xs={24} sm={12} md={8} lg={6}>
            <HotelCard {...hotel} />
          </Col>
        ))}
      </Row>
    </section>
  );
}
