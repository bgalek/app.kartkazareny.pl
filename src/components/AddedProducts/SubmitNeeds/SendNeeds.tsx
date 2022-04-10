import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { Wrapper } from "../../Wrapper";

interface Props {
  onClick: () => void;
}

export const SendNeeds = ({ onClick }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Button
        variant="contained"
        onClick={onClick}
        color="secondary"
        sx={{ paddingTop: "12px", paddingBottom: "12px" }}
        fullWidth
      >
        {t("Prześlij do weryfikacji")}
      </Button>
    </Wrapper>
  );
};
