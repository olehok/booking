import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinations, searchHotels } from "../store/thunks/hotelsThunks";

export default function Hotels() {
  //  useEffect(() => {
  //    searchHotels({ city: "Boston", adults: 2, children: 1 }).then((res) => {
  //      console.log(res.data);
  //    });
  //  }, []);

  // перевірка
  // const dispatch = useDispatch();

  // const { destinations, hotels, loading, error } = useSelector(
  //   (state) => state.hotels
  // );

  // useEffect(() => {
  //   dispatch(fetchDestinations());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(searchHotels({ city: "Boston", adults: 2, children: 0 }));
  // }, [dispatch]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <section className="hotels">
      <div className="container">
        <h2>Our Hotels</h2>
        <p>
          Discover a wide range of hotels available for booking worldwide.
          Whether you're looking for luxury, budget-friendly, or boutique
          accommodations, we have options to suit every traveler's needs.
        </p>
        {/* <div>
          <h2>Destinations</h2>
          <pre>{JSON.stringify(destinations, null, 2)}</pre>

          <h2>Hotels</h2>
          <pre>{JSON.stringify(hotels, null, 2)}</pre>
        </div> */}
      </div>
    </section>
  );
}
