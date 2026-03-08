import SearchForm from "../components/SearchForm";
import { Space, Typography } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  return (
    <section>
      <Space orientation="vertical" size="middle" style={{marginBottom: "2rem" }}>
        <Title level={2}>Travel with <span style={{
          color: 'var(--primary-color)',
          fontWeight: 'bold',
          fontStyle: 'italic',
        }}>Booking</span></Title>
        <Text>
          Explore and book the best hotels around the world with ease and
          confidence.
        </Text>
      </Space>
      <SearchForm />
    </section>
  );
}