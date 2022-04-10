import React, { ReactChildren, ReactElement, useState } from "react";
import { Need } from "../@types/helpers/Need";

interface ContextProps {
  needs: Need[];
  addNeed: (needToAdd: Need) => void;
  deleteNeed: (index: number) => void;
}

interface ProviderProps {
  children: ReactChildren | ReactElement | ReactElement[];
}

export const NeedsContext = React.createContext<ContextProps>({
  needs: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  addNeed: (needToAdd: Need) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  deleteNeed: (index: number) => {},
});

export const NeedsContextProvider = ({
  children,
}: ProviderProps): ReactElement => {
  const [needs, setNeeds] = useState<Need[]>([]);

  const addNeed = (needToAdd: Need) => {
    const needToUpdateIndex = needs.findIndex(
      (need) =>
        need.id === needToAdd.id && need.volunteer === needToAdd.volunteer
    );

    if (needToUpdateIndex === -1) {
      setNeeds((actualNeeds) => [...actualNeeds, needToAdd]);
    } else {
      const updatedNeedsArray = [...needs];
      updatedNeedsArray[needToUpdateIndex].amount += needToAdd.amount;

      setNeeds(updatedNeedsArray);
    }
  };

  const deleteNeed = (index: number) => {
    setNeeds((actualNeeds) => {
      const editedNeeds = [...actualNeeds];
      editedNeeds.splice(index, 1);

      return editedNeeds;
    });
  };

  return (
    <NeedsContext.Provider value={{ needs, addNeed, deleteNeed }}>
      {children}
    </NeedsContext.Provider>
  );
};
