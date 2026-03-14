import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { toggleFavorite } from "../../store/slices/favoritesSlice";
import { Card, Rate, Typography, Space, Image } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./HotelCard.module.scss";

const { Text, Link } = Typography;

// const IMAGE_WIDTH = "100%";
// const IMAGE_HEIGHT = "280px";

const HotelCard = ({ hotel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some((fav) => fav.id === hotel.id);

  return (
    <Card
      hoverable
      className={styles.hotelCard}
      cover={
        <Image
          src={hotel.image_url}
          alt={hotel.name}
          // width={IMAGE_WIDTH}
          // height={IMAGE_HEIGHT}
          className={styles.hotelCardImage}
          fallback={<div className={styles.hotelCardImageFallback} />}
          preview={false}
        />
      }
      actions={[
        isFavorite ? (
          <HeartFilled
            key="fav"
            className={styles.hotelCardFavoriteActive}
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
      <Space
        orientation="vertical"
        size="small"
        className={styles.hotelCardContent}
      >
        <h3>{hotel.name}</h3>

        <Text type="secondary">
          {hotel.address}, {hotel.city}
          {hotel.state && `, ${hotel.state}`} ({hotel.country_code})
        </Text>

        <Space align="baseline">
          <Text type="secondary">
            {t("hotelCard.rating")} {hotel.hotel_rating}
          </Text>
          <Rate disabled size="small" value={hotel.hotel_rating} />
        </Space>

        {hotel.phone_number && (
          <Text type="secondary">
            {t("hotelCard.tel")} {hotel.phone_number}
          </Text>
        )}

        {hotel.website && (
          <Link href={hotel.website} target="_blank">
            {t("hotelCard.visitWebsite")}
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
