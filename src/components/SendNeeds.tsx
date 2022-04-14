import React, { ReactElement, useContext, useState } from "react";
import { NeedsContext } from "../contexts/NeedsContext";
import { useTranslation } from "react-i18next";
import { SnackbarContext } from "../contexts/SnackbarContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { Wrapper } from "./Wrapper";
import { postNeeds } from "../helpers/ArenaAPI";

export const SendNeeds = (): ReactElement => {
  const { t } = useTranslation();
  const { needs, resetNeeds, volunteer } = useContext(NeedsContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await postNeeds(needs, volunteer);
    } catch {
      setIsLoading(false);
      showSnackbar(t("Coś poszło nie tak, spróbuj ponownie za chwilę"), true);
      return;
    }

    resetNeeds();
    setIsLoading(false);
    showSnackbar(t("Zapotrzebowanie wysłane!"));
  };

  return (
    <Wrapper sx={{ paddingBottom: "0px", paddingTop: "0px" }}>
      <LoadingButton
        variant="contained"
        onClick={handleSend}
        color="secondary"
        sx={{ paddingTop: "12px", paddingBottom: "12px", zIndex: 200 }}
        disabled={needs.length === 0 || volunteer.length === 0}
        loading={isLoading}
        fullWidth
      >
        {t("Prześlij do weryfikacji")}
      </LoadingButton>
    </Wrapper>
  );
};
