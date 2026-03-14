import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Space } from "antd";
import HotelsGrid from "../../components/HotelsGrid/HotelsGrid";
import { resetFavorites } from "../../store/slices/favoritesSlice";
import { useTranslation } from "react-i18next";
import styles from "./Favorites.module.scss";

const { Text } = Typography;

export default function Favorites() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const favoriteHotels = useSelector((state) => state.favorites.favorites);

  if (!favoriteHotels.length) {
    return (
      <section>
        <Space orientation="vertical" align="center" className={styles.empty}>
          <h2 className="title">
            {t("favorites.title")}
          </h2>
          <Text>{t("favorites.empty")}</Text>
        </Space>
      </section>
    );
  }

  return (
    <section>
      <Space
        orientation="vertical"
        align="center"
        className={styles.header}
      >
        <h2 className="title">
          {t("favorites.title")}
        </h2>
        <Button
          danger
          onClick={() => dispatch(resetFavorites())}
        >
          {t("favorites.resetAll")}
        </Button>
      </Space>

      <HotelsGrid hotels={favoriteHotels} />
    </section>
  );
}
