import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Space } from "antd";
import HotelsGrid from "../components/HotelsGrid";
import { resetFavorites } from "../store/slices/favoritesSlice";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

export default function Favorites() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const favoriteHotels = useSelector((state) => state.favorites.favorites);

  if (!favoriteHotels.length) {
    return (
      <section>
        <Space orientation="vertical" align="center" style={{ width: "100%" }}>
          <Title level={2} align="center">
            {t("favorites.title")}
          </Title>
          <Text>{t("favorites.empty")}</Text>
        </Space>
      </section>
    );
  }

  return (
    <section>
      <Title level={2} align="center">
        {t("favorites.title")}
      </Title>
      <Button
        danger
        onClick={() => dispatch(resetFavorites())}
        style={{ marginBottom: "1rem" }}
      >
        {t("favorites.resetAll")}
      </Button>

      <HotelsGrid hotels={favoriteHotels} />
    </section>
  );
}
