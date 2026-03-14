import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SearchForm from "../../components/SearchForm/SearchForm";
import HotelsGrid from "../../components/HotelsGrid/HotelsGrid";
import { Space, Typography } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  const featuredHotels = useSelector((state) => state.hotels.featured);

  const { t } = useTranslation();

  return (
    <>
      <section>
        <Space
          orientation="vertical"
          size="middle"
          style={{ marginBottom: "2rem" }}
        >
          <Title level={2} align="center">
            {t("home.title")}
          </Title>
          <Text>
            {t("home.intro")}
          </Text>
        </Space>
        <SearchForm />
      </section>
      <section style={{ marginTop: "3rem" }}>
        <Title level={3} align="center" style={{ marginBottom: "1rem" }}>
          {t("home.featuredTitle")}
        </Title>
        <HotelsGrid hotels={featuredHotels} />
      </section>
    </>
  );
}
