import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Space } from "antd";
import HotelsGrid from "../components/HotelsGrid";
import { resetFavorites } from "../store/slices/favoritesSlice";

const { Title, Text } = Typography;

export default function Profile() {
    const dispatch = useDispatch();

    const favoriteHotels = useSelector((state) => state.favorites.favorites);

    // // отримуємо всі готелі, які вже були завантажені
    // const allHotels = useSelector((state) => state.hotels.hotels);

    // // фільтруємо тільки улюблені
    // const favoriteHotels = allHotels.filter((hotel) =>
    //   favoriteIds.includes(hotel.id),
    // );

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
      <h2>Profile</h2>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <Title level={3}>Your Favorites</Title>

        <Button danger onClick={() => dispatch(resetFavorites())}>
          Reset all
        </Button>
      </Space>

      <HotelsGrid hotels={favoriteHotels} />
    </section>
  );
}
