import { Typography } from "antd";
const { Text, Title } = Typography;

export default function About() {
  return (
    <section>
      <Title level={2} align="center">
        About the Booking App
      </Title>
      <Text>
        The Booking App is designed to help users find and book hotels worldwide
        with ease. Our mission is to provide a seamless booking experience,
        offering a wide range of options to suit every traveler's needs.
      </Text>
    </section>
  );
}
