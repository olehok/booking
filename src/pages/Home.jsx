import SearchForm from "../components/SearchForm";
import { Space, Typography } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  return (
    <section>
      <Space orientation="horizontal" size="middle">
        <Title level={3}>Travel with </Title>
        <Title
          level={3}
          italic
          style={{
            color: "var(--primary-color)",
            WebkitTextStroke: "1px var(--primary-color)",
          }}
        >
          Booking
        </Title>
      </Space>
      <div>
        <Text>
          Explore and book the best hotels around the world with ease and
          confidence.
        </Text>
      </div>
      <SearchForm />
    </section>
  );
}