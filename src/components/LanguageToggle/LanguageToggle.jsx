import { Segmented } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const { lng } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLng = lng || i18n.language || "en";
  const changeLanguage = (newLng) => {
    if (newLng === currentLng) return;
    const restPath = location.pathname.replace(
      new RegExp(`^/${currentLng}(?=/|$)`),
      "",
    );
    navigate(`/${newLng}${restPath}${location.search}${location.hash}`);
  };

  return (
    <Segmented
      size="small"
      value={currentLng}
      onChange={changeLanguage}
      options={[
        { label: "EN", value: "en" },
        { label: "UA", value: "ua" },
      ]}
    />
  );
}
