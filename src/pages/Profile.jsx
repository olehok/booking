import { useSelector, useDispatch } from "react-redux";
import { Typography, Card, Space } from "antd";

const { Title, Text } = Typography;

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Welcome, {user?.name}</Title>
      <Card>
        <Space orientation="vertical" size="middle">
          <Title level={4}>Your profile information:</Title>
          <Text>Username: {user?.name}</Text>
          <Text>Email: {user?.email}</Text>
        </Space>
      </Card>
    </div>
  );
}
