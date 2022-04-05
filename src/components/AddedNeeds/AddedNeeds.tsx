import React, { ReactElement, useContext } from "react";
import { NeedsContext } from "../../contexts/NeedsContext";
import { NeedsTable } from "./NeedsTable/NeedsTable";
import { SendNeeds } from "./SubmitNeeds/SendNeeds";

export const AddedNeeds = (): ReactElement => {
  const { needs } = useContext(NeedsContext);

  const handleSend = (): void => {
    console.log(needs);
  };

  return needs.length > 0 ? (
    <>
      <NeedsTable needs={needs} />
      <SendNeeds onClick={handleSend}></SendNeeds>
    </>
  ) : (
    <></>
  );
};
