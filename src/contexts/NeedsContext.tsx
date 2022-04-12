import React, { ReactChildren, ReactElement, useState } from "react";
import { Need } from "../@types/helpers/Need";

interface ContextProps {
  needs: Need[];
  volunteer: string;
  setVolunteer: React.Dispatch<React.SetStateAction<string>>;
  addNeed: (needToAdd: Need) => void;
  deleteNeed: (index: number) => void;
  resetNeeds: () => void;
}

interface ProviderProps {
  children: ReactChildren | ReactElement | ReactElement[];
}

export const NeedsContext = React.createContext<ContextProps>({
  needs: [],
  volunteer: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setVolunteer: (value: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  addNeed: (needToAdd: Need) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  deleteNeed: (index: number) => {},
  resetNeeds: () => {},
});

export const NeedsContextProvider = ({
  children,
}: ProviderProps): ReactElement => {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [volunteer, setVolunteer] = useState<string>("");

  const addNeed = (needToAdd: Need) => {
    const needToUpdateIndex = needs.findIndex(
      (need) => need.id === needToAdd.id
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

  const resetNeeds = (): void => {
    setNeeds([]);
  };

  return (
    <NeedsContext.Provider
      value={{
        needs,
        addNeed,
        deleteNeed,
        resetNeeds,
        setVolunteer,
        volunteer,
      }}
    >
      {children}
    </NeedsContext.Provider>
  );
};
