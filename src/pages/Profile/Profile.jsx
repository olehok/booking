import { useSelector } from "react-redux";
import { Typography, Card, Space } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

export default function Profile() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const userName = user?.name || t("profile.defaultName");

  return (
    <section>
      <Title level={2} align="center">
        {t("profile.welcome")},{" "}
        <span style={{ color: "var(--primary-color)" }}>{userName}</span>
      </Title>
      <Card>
        <Space orientation="vertical" size="middle">
          <Title level={4} align="center">
            {t("profile.infoTitle")}
          </Title>
          <Text>
            {t("profile.usernameLabel")} {userName}
          </Text>
          <Text>
            {t("profile.emailLabel")} {user?.email}
          </Text>
        </Space>
      </Card>
    </section>
  );
}
