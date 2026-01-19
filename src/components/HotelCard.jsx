import PropTypes from "prop-types";
import { Card, Rate, Typography, Space, Button, Image } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

const IMAGE_WIDTH = "100%";
const IMAGE_HEIGHT = 180;

const HotelCard = ({
  image_url,
  name,
  address,
  city,
  state,
  country_code,
  phone_number,
  website,
  hotel_rating,
}) => {
  return (
    <Card
      hoverable
      cover={
        <Image
          src={image_url}
          alt={name}
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
      actions={[<HeartOutlined key="fav" />]}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Title level={4}>{name}</Title>

        <Text type="secondary">
          {address}, {city}
          {state && `, ${state}`} ({country_code})
        </Text>

        <Space align="center">
          <Rate disabled value={hotel_rating} />
          <Text type="secondary">{hotel_rating}/5</Text>
        </Space>

        {phone_number && <Text>{phone_number}</Text>}

        {website && (
          <Link href={website} target="_blank">
            Visit website
          </Link>
        )}
      </Space>
    </Card>
  );
};

HotelCard.propTypes = {
  image_url: PropTypes.string,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string,
  country_code: PropTypes.string.isRequired,
  phone_number: PropTypes.string,
  website: PropTypes.string,
  hotel_rating: PropTypes.number.isRequired,
};

export default HotelCard;
