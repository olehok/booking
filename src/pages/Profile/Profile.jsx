import { useSelector } from "react-redux";
import { Typography, Card, Space } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./Profile.module.scss";

const { Text } = Typography;

export default function Profile() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const userName = user?.name || t("profile.defaultName");

  return (
    <section>
      <h2 className="title">
        {t("profile.welcome")},{" "}
        <span className={styles.userName}>{userName}</span>
      </h2>
      <Card>
        <Space orientation="vertical" size="middle">
          <h4 className={styles.infoTitle}>
            {t("profile.infoTitle")}
          </h4>
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
