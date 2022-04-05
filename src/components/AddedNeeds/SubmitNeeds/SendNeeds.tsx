import { Button } from "@mui/material";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onClick: () => void;
}

export const SendNeeds = ({ onClick }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      onClick={onClick}
      color="success"
      sx={{ marginTop: "16px", width: "100%" }}
    >
      {t("Prześlij")}
    </Button>
  );
};
