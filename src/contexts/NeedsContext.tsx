import React, { ReactChildren, ReactElement, useState } from 'react';
import { Need } from '../@types/helpers/Need';

interface ContextProps {
  needs: Need[];
  addNeed: (needToAdd: Need) => void;
}

interface ProviderProps {
  children: ReactChildren | ReactElement | ReactElement[];
}

export const NeedsContext = React.createContext<ContextProps>({
  needs: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  addNeed: (needToAdd: Need) => {},
});

export const NeedsContextProvider = ({
  children,
}: ProviderProps): ReactElement => {
  const [needs, setNeeds] = useState<Need[]>([]);

  const addNeed = (needToAdd: Need) => {
    const needToUpdateIndex = needs.findIndex(
      (need) =>
        need.productId === needToAdd.productId && need.name === needToAdd.name
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
