import { useSelector } from "react-redux";
import { translations } from "../i18n/translations";

export function useTranslation() {
    const lang = useSelector((state) => state.language.lang);

    const t = (path) => {
        const keys = path.split(".");
        let result = translations[lang];

        keys.forEach((key) => {
            result = result?.[key];
        });

        return result || path;
    };

    return { t, lang };
}