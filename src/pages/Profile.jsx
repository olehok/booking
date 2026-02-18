import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Button, Space } from "antd";
import HotelCard from "../components/HotelCard";
import { resetFavorites } from "../store/slices/favoritesSlice";

const { Title, Text } = Typography;

export default function Profile() {
    const dispatch = useDispatch();

    // отримуємо favorites IDs
    const favoriteIds = useSelector((state) => state.favorites.favorites);

    // отримуємо всі готелі, які вже були завантажені
    const allHotels = useSelector((state) => state.hotels.hotels);

    // фільтруємо тільки улюблені
    const favoriteHotels = allHotels.filter((hotel) =>
      favoriteIds.includes(hotel.id),
    );

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

      <Row gutter={[24, 36]}>
        {favoriteHotels.map((hotel) => (
          <Col key={hotel.id} xs={24} sm={12}>
            <HotelCard {...hotel} />
          </Col>
        ))}
      </Row>
    </section>
  );
}
