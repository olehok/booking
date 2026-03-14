import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SearchForm from "../../components/SearchForm/SearchForm";
import HotelsGrid from "../../components/HotelsGrid/HotelsGrid";
import { Space, Typography } from "antd";
import styles from "./Home.module.scss";

const { Text } = Typography;

export default function Home() {
  const featuredHotels = useSelector((state) => state.hotels.featured);

  const { t } = useTranslation();

  return (
    <>
      <section>
        <Space
          orientation="vertical"
          size="middle"
          className={styles.intro}
        >
          <h2 className="title">
            {t("home.title")}
          </h2>
          <Text>
            {t("home.intro")}
          </Text>
        </Space>
        <SearchForm />
      </section>
      <section className={styles.featured}>
        <h3 className="title">
          {t("home.featuredTitle")}
        </h3>
        <HotelsGrid hotels={featuredHotels} />
      </section>
    </>
  );
}
