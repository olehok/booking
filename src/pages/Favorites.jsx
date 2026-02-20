import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Space } from "antd";
import HotelsGrid from "../components/HotelsGrid";
import { resetFavorites } from "../store/slices/favoritesSlice";

const { Title, Text } = Typography;

export default function Favorites() {
  const dispatch = useDispatch();

  const favoriteHotels = useSelector((state) => state.favorites.favorites);

  if (!favoriteHotels.length) {
    return (
      <Space orientation="vertical" align="center" style={{ width: "100%" }}>
        <Title level={3}>Your Favorites</Title>
        <Text>No favorite hotels yet.</Text>
      </Space>
    );
  }

  return (
    <section>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h2>Your favorites</h2>
        <Button danger onClick={() => dispatch(resetFavorites())}>
          Reset all
        </Button>
      </Space>

      <HotelsGrid hotels={favoriteHotels} />
    </section>
  );
}
