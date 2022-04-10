import React, { ReactChildren, ReactElement, useState } from "react";
import { ProductListItem } from "../@types/helpers/ProductListItem";

interface ContextProps {
  needs: ProductListItem[];
  addNeed: (needToAdd: ProductListItem) => void;
  deleteNeed: (index: number) => void;
}

interface ProviderProps {
  children: ReactChildren | ReactElement | ReactElement[];
}

const MOCK_NEEDS = [
  {
    name: {
      PL: "łyżki duże plastikowe",
      UK: "Lodowa / Mysłowa",
    },
    category: {
      id: "naczynia-i-sztucce",
      name: {
        PL: "Naczynia i sztućce",
        UK: "Страви та столові прилади",
      },
    },
    unit: {
      PL: "szt.",
      UK: "хамма",
    },
    id: "lyzki-duze-plastikowe-naczynia-i-sztucce-szt",
    volunteer: "Dawid Tomczak",
    amount: 12,
  },
  {
    name: {
      PL: "widelce plastikowe",
      UK: "червоний перець",
    },
    category: {
      id: "naczynia-i-sztucce",
      name: {
        PL: "Naczynia i sztućce",
        UK: "Страви та столові прилади",
      },
    },
    unit: {
      PL: "szt.",
      UK: "хамма",
    },
    id: "widelce-plastikowe-naczynia-i-sztucce-szt",
    volunteer: "Dawid Tomczak",
    amount: 3,
  },
  {
    name: {
      PL: "kubeczki do ciepłych napojów papierowe/styropianowe",
      UK: "Різні фруктові трубки (не доза)",
    },
    category: {
      id: "naczynia-i-sztucce",
      name: {
        PL: "Naczynia i sztućce",
        UK: "Страви та столові прилади",
      },
    },
    unit: {
      PL: "szt.",
      UK: "хамма",
    },
    id: "kubeczki-do-cieplych-napojow-papierowestyropianowe-naczynia-i-sztucce-szt",
    volunteer: "Dawid Tomczak",
    amount: 100,
  },
];

export const NeedsContext = React.createContext<ContextProps>({
  needs: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  addNeed: (needToAdd: ProductListItem) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  deleteNeed: (index: number) => {},
});

export const NeedsContextProvider = ({
  children,
}: ProviderProps): ReactElement => {
  const [needs, setNeeds] = useState<ProductListItem[]>(MOCK_NEEDS);

  const addNeed = (needToAdd: ProductListItem) => {
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
