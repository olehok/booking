import { Typography, Space, Button } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <h3>Contacts</h3>
        <Space orientation="horizontal" size="small">
          <Text>© 2026 Oleh Kovalenko</Text>
          <Button
            type="text"
            style={{ fontSize: "1.375rem", color: "var(--primary-color)" }}
            icon={<GithubOutlined />}
            onClick={() => window.open("https://github.com/olehok/booking", "_blank")}
          />
          <Button
            type="text"
            style={{ fontSize: "1.375rem", color: "var(--primary-color)" }}
            icon={<LinkedinOutlined />}
            onClick={() => window.open("https://www.linkedin.com/in/olehkvln/", "_blank")}
          />
        </Space>
      </div>
    </footer>
  );
}
