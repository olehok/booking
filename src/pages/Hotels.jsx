import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinations, searchHotels } from "../store/thunks/hotelsThunks";

export default function Hotels() {
  const { hotels, loading, error } = useSelector((state) => state.hotels);

  if (loading) {
    return <p>Loading hotels...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!hotels.length) {
    return <p>No hotels found</p>;
  }

  return (
    <section className="hotels">
      <div className="container">
        <h2>Our Hotels</h2>
        <p>
          Discover a wide range of hotels available for booking worldwide.
          Whether you're looking for luxury, budget-friendly, or boutique
          accommodations, we have options to suit every traveler's needs.
        </p>
        <div className="hotels-list">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <h3>{hotel.name}</h3>
              <p>City: {hotel.city}</p>
              <p>Address: {hotel.address}</p>
              <p>Rating: {hotel.hotel_rating}</p>
              <p>Phone number: {hotel.phone_number}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
