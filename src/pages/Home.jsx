import { useSelector } from "react-redux";
import SearchForm from "../components/SearchForm";
import HotelsGrid from "../components/HotelsGrid";
import { Space, Typography } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  const featuredHotels = useSelector((state) => state.hotels.featured);

  return (
    <>
      <section>
        <Space
          orientation="vertical"
          size="middle"
          style={{ marginBottom: "2rem" }}
        >
          <Title level={2} align="center">
            Travel with Booking
          </Title>
          <Text>
            Explore and book the best hotels around the USA with ease and
            confidence. Find your perfect stay and enjoy unforgettable travel
            experiences with us!
          </Text>
        </Space>
        <SearchForm />
      </section>
      <section style={{ marginTop: "3rem" }}>
        <Title level={3} align="center" style={{ marginBottom: "1rem" }}>
          Featured Hotels
        </Title>
        <HotelsGrid hotels={featuredHotels} />
      </section>
    </>
  );
}
