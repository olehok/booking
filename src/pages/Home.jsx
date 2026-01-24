import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <section className="home">
      <div >
        <h2>Travel with Booking</h2>
        <p>
          Explore and book the best hotels around the world with ease and
          confidence.
        </p>
        <SearchForm />
      </div>
    </section>
  );
}
