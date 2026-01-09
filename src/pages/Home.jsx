import { useEffect } from "react";
import { getDestinations } from "../services/hotelsService";

export default function Home() {
  // console.log(import.meta.env.VITE_API_URL);
  useEffect(() => {
    getDestinations().then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <section className="home">
      <div className="container">
        <h2>Booking Home</h2>
        <p>
          Explore and book the best hotels around the world with ease and
          confidence.
        </p>
      </div>
    </section>
  );
}
