import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <Space>
      <Button size="small" onClick={() => i18n.changeLanguage("en")}>
        EN
      </Button>

      <Button size="small" onClick={() => i18n.changeLanguage("ua")}>
        UA
      </Button>
    </Space>
  );
}