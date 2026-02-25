import { useSelector } from "react-redux";
import { Typography, Card, Space } from "antd";

const { Title, Text } = Typography;

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const userName = user?.name || "Special One";

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Welcome, <span style={{color: 'var(--primary-color)'}}>{userName}</span></Title>
      <Card>
        <Space orientation="vertical" size="middle">
          <Title level={4}>Your profile information:</Title>
          <Text>Username: {userName}</Text>
          <Text>Email: {user?.email}</Text>
        </Space>
      </Card>
    </div>
  );
}
