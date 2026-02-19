import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { toggleFavorite } from "../store/slices/favoritesSlice";
import { Card, Rate, Typography, Space, Image } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

const IMAGE_WIDTH = "100%";
const IMAGE_HEIGHT = 300;

const HotelCard = ({ hotel }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some((fav) => fav.id === hotel.id);

  return (
    <Card
      hoverable
      style={{ overflow: "hidden" }}
      cover={
        <Image
          src={hotel.image_url}
          alt={hotel.name}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          style={{ objectFit: "cover" }}
          fallback={`data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='400' height='180'>
              <rect width='100%' height='100%' fill='%23d9d9d9'/>
            </svg>`}
          preview={false}
        />
      }
      actions={[
        isFavorite ? (
          <HeartFilled
            key="fav"
            style={{ color: "red" }}
            onClick={() => dispatch(toggleFavorite(hotel))}
          />
        ) : (
          <HeartOutlined
            key="fav"
            onClick={() => dispatch(toggleFavorite(hotel))}
          />
        ),
      ]}
    >
      <Space orientation="vertical" size="small" style={{ width: "100%" }}>
        <Title level={4}>{hotel.name}</Title>

        <Text type="secondary">
          {hotel.address}, {hotel.city}
          {hotel.state && `, ${hotel.state}`} ({hotel.country_code})
        </Text>

        <Space align="baseline">
          <Text type="secondary">Rating: {hotel.hotel_rating}</Text>
          <Rate disabled size="small" value={hotel.hotel_rating} />
        </Space>

        {hotel.phone_number && <Text type="secondary">Tel: {hotel.phone_number}</Text>}

        {hotel.website && (
          <Link href={hotel.website} target="_blank">
            Visit website
          </Link>
        )}
      </Space>
    </Card>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    image_url: PropTypes.string,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string,
    country_code: PropTypes.string.isRequired,
    phone_number: PropTypes.string,
    website: PropTypes.string,
    hotel_rating: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default HotelCard;
