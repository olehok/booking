import { useTranslation } from "react-i18next";
import { Typography } from "antd";

const { Text } = Typography;

export default function About() {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className="title">{t("about.title")}</h2>
      <Text>{t("about.body")}</Text>
    </section>
  );
}
