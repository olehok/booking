import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Space } from "antd";
import HotelsGrid from "../components/HotelsGrid";
import { resetFavorites } from "../store/slices/favoritesSlice";

const { Text, Title } = Typography;

export default function Favorites() {
  const dispatch = useDispatch();

  const favoriteHotels = useSelector((state) => state.favorites.favorites);

  if (!favoriteHotels.length) {
    return (
      <section>
        <Space orientation="vertical" align="center" style={{ width: "100%" }}>
          <Title level={2} align="center">
            Your favorites
          </Title>
          <Text>No favorite hotels yet.</Text>
        </Space>
      </section>
    );
  }

  return (
    <section>
     
        <Title level={2} align="center">
          Your favorites
        </Title>
        <Button danger onClick={() => dispatch(resetFavorites())} style={{ marginBottom: "1rem" }}>
          Reset all
        </Button>

      <HotelsGrid hotels={favoriteHotels} />
    </section>
  );
}
