import React from "react";
import {
  AppBar,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";
import { Language } from "../@types/shared/Language";

const Header = () => {
  const { t, i18n } = useTranslation();
  // @ts-ignore
  const languages: string[] = Object.keys(i18n.options.resources);

  const handleLanguageChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    event.preventDefault();

    i18n.changeLanguage(value);
  };

  return (
    <header className={styles.header}>
      <span className={styles.header__title}>{t("Kartka z areny")}</span>
      <div className={styles.header__actions}>
        {languages.map((lang) => (
          <button
            key={lang}
            value={lang}
            disabled={i18n.language === lang}
            onClick={(e) => handleLanguageChange(e, lang)}
            aria-label={lang}
            className={`
                ${styles.actions__language_button} 
                ${styles["actions__language_button-" + lang]}`}
          ></button>
        ))}
      </div>
    </header>
  );
};

export default Header;
