import { useSelector, useDispatch } from "react-redux";
// import { resetFavorites } from "../store/slices/favoritesSlice";
import { Card, Button, Typography } from "antd";

const { Title } = Typography;

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  // const favorites = useSelector((state) => state.favorites.favorites);

  // const dispatch = useDispatch();

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Welcome, {user?.email}</Title>

      {/* <Card style={{ marginTop: 24 }}>
        <p>Favorite hotels: {favorites.length}</p>

        <Button danger onClick={() => dispatch(resetFavorites())}>
          Reset favorites
        </Button>
      </Card> */}
    </div>
  );
}
