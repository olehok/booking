import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ConfigProvider, theme as antdTheme } from "antd";

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
          colorBgContainer: "var(--background-component-color)",
          colorText: "var(--text-color)",
          colorPrimary: "var(--primary-color)",
          colorPrimaryHover: "var(--primary-color-hover)",
          colorPrimaryActive: "var(--primary-color-active)",
          colorPrimaryBorder: "var(--primary-color-border)",
          colorPrimaryBorderHover: "var(--primary-color-hover)",
          colorPrimaryText: "var(--primary-color)",
          colorPrimaryTextHover: "var(--primary-color-hover)",
          colorPrimaryTextActive: "var(--primary-color-active)",
          colorTextSecondary: "var(--secondary-color)",
          colorTextPlaceholder: "var(--secondary-color)",
          colorBorder: "var(--secondary-color)",
        },
        components: {
          Button: {
            colorPrimary: "var(--primary-color)",
            colorPrimaryHover: "var(--primary-color-hover)",
            colorPrimaryActive: "var(--primary-color-active)",
            colorPrimaryBorder: "var(--primary-color-border)",
            defaultBg: "var(--background-component-color)",
            defaultColor: "var(--text-color)",
            defaultBorderColor: "var(--secondary-color)",
            textHoverBg: "var(--background-color)",
          },
          Segmented: {
            trackBg: "var(--background-component-color)",
            itemColor: "var(--text-color)",
            itemHoverColor: "var(--primary-color)",
            itemHoverBg: "var(--background-color)",
            itemSelectedColor: "var(--on-primary-color)",
            itemSelectedBg: "var(--primary-color)",
          },
          Switch: {
            colorPrimary: "var(--primary-color)",
            colorPrimaryHover: "var(--primary-color-hover)",
            handleBg: "var(--background-component-color)",
            handleShadow: "none",
            trackBg: "var(--background-color)",
            trackBgHover: "var(--background-color)",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
