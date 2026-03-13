import { Typography } from "antd";
import { useTranslation } from "react-i18next";
const { Text, Title } = Typography;

export default function About() {
  const { t } = useTranslation();

  return (
    <section>
      <Title level={2} align="center">
        {t("about.title")}
      </Title>
      <Text>
        {t("about.body")}
      </Text>
    </section>
  );
}
