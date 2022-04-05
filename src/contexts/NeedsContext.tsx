import React, { ReactChildren, ReactElement, useState } from "react";
import { ProductNeed } from "../@types/helpers/ProductNeed";

interface ContextProps {
  needs: ProductNeed[];
  addNeed: (needToAdd: ProductNeed) => void;
}

interface ProviderProps {
  children: ReactChildren | ReactElement | ReactElement[];
}

export const NeedsContext = React.createContext<ContextProps>({
  needs: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  addNeed: (needToAdd: ProductNeed) => {},
});

export const NeedsContextProvider = ({
  children,
}: ProviderProps): ReactElement => {
  const [needs, setNeeds] = useState<ProductNeed[]>([]);

  const addNeed = (needToAdd: ProductNeed) => {
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

  return (
    <NeedsContext.Provider value={{ needs, addNeed }}>
      {children}
    </NeedsContext.Provider>
  );
};
