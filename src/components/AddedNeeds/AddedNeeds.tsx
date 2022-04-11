import React, { ReactElement, useContext } from "react";
import { NeedsContext } from "../../contexts/NeedsContext";
import { postNeeds } from "../../helpers/ArenaAPI";
import { NeedsList } from "./NeededsList/NeedsList";
import { SendNeeds } from "./SubmitNeeds/SendNeeds";

export const AddedNeeds = (): ReactElement => {
  const { needs, deleteNeed } = useContext(NeedsContext);

  const handleSend = async (): Promise<void> => {
    await postNeeds(needs);
  };

  return (
    <>
      <NeedsList needs={needs} deleteNeed={deleteNeed} />
      <SendNeeds disabled={needs.length === 0} onClick={handleSend}></SendNeeds>
    </>
  );
};
