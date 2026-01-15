import { use, useEffect } from "react";
import { getDestinations } from "../services/hotelsService";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <section className="home">
      <div className="container">
        <h2>Booking Home</h2>
        <p>
          Explore and book the best hotels around the world with ease and
          confidence.
        </p>
        <SearchForm />
      </div>
    </section>
  );
}
