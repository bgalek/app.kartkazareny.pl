import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import { Wrapper } from "../../Wrapper";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const SendNeeds = ({
  onClick,
  disabled,
  loading,
}: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <LoadingButton
        variant="contained"
        onClick={onClick}
        color="secondary"
        sx={{ paddingTop: "12px", paddingBottom: "12px" }}
        disabled={disabled}
        loading={loading}
        fullWidth
      >
        {t("Prześlij do weryfikacji")}
      </LoadingButton>
    </Wrapper>
  );
};
