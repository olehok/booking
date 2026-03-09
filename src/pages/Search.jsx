import SearchForm from "../components/SearchForm";
import { Typography } from "antd";
const { Title } = Typography;

export default function Search() {
  return (
    <section>
      <Title level={2} align="center">
        Choose your destination
      </Title>
      <SearchForm style={{ marginTop: "3rem" }} />
    </section>
  );
}