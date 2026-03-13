import { Typography, Space, Button } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <h3>{t("footer.contacts")}</h3>
      <Space orientation="horizontal" size="small">
        <Text>{t("footer.copyright")}</Text>
        <Button
          type="text"
          style={{ fontSize: "1.375rem", color: "var(--primary-color)" }}
          icon={<GithubOutlined />}
          onClick={() =>
            window.open("https://github.com/olehok/booking", "_blank")
          }
        />
        <Button
          type="text"
          style={{ fontSize: "1.375rem", color: "var(--primary-color)" }}
          icon={<LinkedinOutlined />}
          onClick={() =>
            window.open("https://www.linkedin.com/in/olehkvln/", "_blank")
          }
        />
      </Space>
    </footer>
  );
}
