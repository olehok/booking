import SearchForm from "../components/SearchForm";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
const { Title } = Typography;

export default function Search() {
  const { t } = useTranslation();

  return (
    <section>
      <Title level={2} align="center">
        {t("search.title")}
      </Title>
      <SearchForm style={{ marginTop: "3rem" }} />
    </section>
  );
}
