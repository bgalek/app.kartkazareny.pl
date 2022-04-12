import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Language } from "../../../@types/shared/Language";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const VolunteerField = ({ value, onChange }: Props): ReactElement => {
  const { t, i18n } = useTranslation();

  const namePlaceholder = {
    PL: "Jan Kowalski",
    UK: "Иван Петрович",
  };

  return (
    <FormControl required variant="outlined" fullWidth>
      <InputLabel htmlFor="name-input">{t("Imię i Nazwisko")}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        id="name-input"
        aria-describedby="name-input"
        label={t("Imię i Nazwisko")}
        placeholder={namePlaceholder[i18n.language as Language]}
      />
    </FormControl>
  );
};
