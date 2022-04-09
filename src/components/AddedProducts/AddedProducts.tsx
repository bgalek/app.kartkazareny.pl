import React, { ReactElement, useContext } from "react";
import { NeedsContext } from "../../contexts/NeedsContext";
import { NeededProductsList } from "./NeededProductsList/NeededProductsList";
import { SendNeeds } from "./SubmitNeeds/SendNeeds";

export const AddedProducts = (): ReactElement => {
  const { needs } = useContext(NeedsContext);

  const handleSend = (): void => {
    console.log(needs);
  };

  return (
    <>
      <NeededProductsList
        needs={needs}
        deleteNeed={(index) => {
          console.log(index);
        }}
      />
      <SendNeeds onClick={handleSend}></SendNeeds>
    </>
  );
};
