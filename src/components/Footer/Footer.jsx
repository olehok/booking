import { Typography, Space, Button } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./Footer.module.scss";

const { Text, Title } = Typography;

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <section className={`${styles.footer} container`}>
        <Title level={3}>{t("footer.contacts")}</Title>
        <Space orientation="horizontal" size="small">
          <Text>{t("footer.copyright")}</Text>
          <Button
            type="text"
            className={styles.socialButton}
            icon={<GithubOutlined />}
            onClick={() =>
              window.open("https://github.com/olehok/booking", "_blank")
            }
          />
          <Button
            type="text"
            className={styles.socialButton}
            icon={<LinkedinOutlined />}
            onClick={() =>
              window.open("https://www.linkedin.com/in/olehkvln/", "_blank")
            }
          />
        </Space>
      </section>
    </footer>
  );
}
