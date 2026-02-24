import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Spin, ConfigProvider, theme as antdTheme } from "antd";

export default function ThemeProvider({ children }) {
  const mode = useSelector((state) => state.theme.mode);
  const isDarkMode = mode === "dark";

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          fontFamily: "var(--font-main)",
          // fontSize: "1rem",
          // fontSizeHeading3: "1.25rem",
          // fontSizeHeading4: "1.15rem",
          // fontSizeSM: "0.875rem",
          // lineHeight: "1.3",
          colorBgContainer: "var(--background-component-color)",
          colorText: "var(--text-color)",
          // colorPrimary: "var(--primary-color)",
          colorTextSecondary: "var(--secondary-color)",
          colorTextPlaceholder: "var(--secondary-color)",
          colorBorder: "var(--secondary-color)",
          // colorBorderSecondary: "var(--secondary-color)",
          // colorError: "var(--error-color)",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
