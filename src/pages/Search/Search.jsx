import SearchForm from "../../components/SearchForm/SearchForm";
import { useTranslation } from "react-i18next";
import styles from "./Search.module.scss";

export default function Search() {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className="title">
        {t("search.title")}
      </h2>
      <div className={styles.formWrapper}>
        <SearchForm />
      </div>
    </section>
  );
}
