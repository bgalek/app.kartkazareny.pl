import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const FormHeaderComponent = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <Typography variant="subtitle1">
      {t("Formularz do zgłaszania zapotrzebowania na produkty")}
    </Typography>
  );
};

export const FormHeader = React.memo(FormHeaderComponent);
