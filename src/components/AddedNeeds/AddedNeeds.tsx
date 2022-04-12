import React, { ReactElement, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { NeedsContext } from "../../contexts/NeedsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { postNeeds } from "../../helpers/ArenaAPI";
import { NeedsList } from "./NeededsList/NeedsList";
import { SendNeeds } from "./SubmitNeeds/SendNeeds";

export const AddedNeeds = (): ReactElement => {
  const { needs, deleteNeed, resetNeeds } = useContext(NeedsContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await postNeeds(needs);
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
    <>
      <NeedsList needs={needs} deleteNeed={deleteNeed} />
      <SendNeeds
        disabled={needs.length === 0}
        onClick={handleSend}
        loading={isLoading}
      ></SendNeeds>
    </>
  );
};
