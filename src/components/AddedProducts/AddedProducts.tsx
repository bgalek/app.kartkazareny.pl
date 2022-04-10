import React, { ReactElement, useContext } from "react";
import { NeedsContext } from "../../contexts/NeedsContext";
import { NeededProductsList } from "./NeededProductsList/NeededProductsList";
import { SendNeeds } from "./SubmitNeeds/SendNeeds";

export const AddedProducts = (): ReactElement => {
  const { needs, deleteNeed } = useContext(NeedsContext);

  const handleSend = (): void => {
    console.log(needs);
  };

  return (
    <>
      <NeededProductsList needs={needs} deleteNeed={deleteNeed} />
      <SendNeeds disabled={needs.length === 0} onClick={handleSend}></SendNeeds>
    </>
  );
};
