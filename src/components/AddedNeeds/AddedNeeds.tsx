import React, { ReactElement, useContext, useState } from "react";
import { NeedsContext } from "../../contexts/NeedsContext";
import { postNeeds } from "../../helpers/ArenaAPI";
import { NeedsList } from "./NeededsList/NeedsList";
import { SendNeeds } from "./SubmitNeeds/SendNeeds";

export const AddedNeeds = (): ReactElement => {
  const { needs, deleteNeed, resetNeeds } = useContext(NeedsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await postNeeds(needs);
    } catch {
      setIsLoading(false);
      return;
    }

    resetNeeds();
    setIsLoading(false);
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
