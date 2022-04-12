import React, { ReactElement, useContext } from "react";
import { NeedsContext } from "../contexts/NeedsContext";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { Wrapper } from "./Wrapper";

export const SendNeeds = (): ReactElement => {
  const { t } = useTranslation();
  const { needs } = useContext(NeedsContext);

  const onClick = () => {
    console.log(needs);
  };

  return (
    <Wrapper sx={{ paddingBottom: "0px", paddingTop: "0px" }}>
      <Button
        variant="contained"
        onClick={onClick}
        color="secondary"
        sx={{ paddingTop: "12px", paddingBottom: "12px", zIndex: 200 }}
        disabled={needs.length === 0}
        fullWidth
      >
        {t("Prześlij do weryfikacji")}
      </Button>
    </Wrapper>
  );
};
