import React, { ReactChildren, ReactElement, useState } from "react";
import { ProductListItem } from "../@types/helpers/ProductListItem";

interface ContextProps {
  needs: ProductListItem[];
  addNeed: (needToAdd: ProductListItem) => void;
}

interface ProviderProps {
  children: ReactChildren | ReactElement | ReactElement[];
}

export const NeedsContext = React.createContext<ContextProps>({
  needs: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  addNeed: (needToAdd: ProductListItem) => {},
});

export const NeedsContextProvider = ({
  children,
}: ProviderProps): ReactElement => {
  const [needs, setNeeds] = useState<ProductListItem[]>([
    {
      name: {
        PL: "opakowania rękawiczek lateksowych M",
        UK: "Перець невелика сумочка",
      },
      category: {
        id: "art-higieniczne",
        name: {
          PL: "Art. higieniczne",
          UK: "Мистецтво. Гігієнічний",
        },
      },
      unit: {
        PL: "szt.",
        UK: "хамма",
      },
      id: "opakowania-rekawiczek-lateksowych-m-art-higieniczne-szt",
      volunteer: "Dawid",
      amount: 3,
    },
    {
      name: {
        PL: "opakowania rękawiczek lateksowych M",
        UK: "Перець невелика сумочка",
      },
      category: {
        id: "art-higieniczne",
        name: {
          PL: "Art. higieniczne",
          UK: "Мистецтво. Гігієнічний",
        },
      },
      unit: {
        PL: "szt.",
        UK: "хамма",
      },
      id: "opakowania-rekawiczek-lateksowych-m-art-higieniczne-szt2",
      volunteer: "Dawid",
      amount: 3,
    },
    {
      name: {
        PL: "opakowania rękawiczek lateksowych Mopakowania rękawiczek lateksowych Mopakowania rękawiczek lateksowych Mopakowania rękawiczek lateksowych Mopakowania rękawiczek lateksowych Mopakowania rękawiczek lateksowych M",
        UK: "Перець невелика сумочка",
      },
      category: {
        id: "art-higieniczne",
        name: {
          PL: "Art. higieniczne",
          UK: "Мистецтво. Гігієнічний",
        },
      },
      unit: {
        PL: "szt.",
        UK: "хамма",
      },
      id: "opakowania-rekawiczek-lateksowych-m-art-higieniczne-szt3",
      volunteer: "Dawid",
      amount: 3,
    },
  ]);

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

  return (
    <NeedsContext.Provider value={{ needs, addNeed }}>
      {children}
    </NeedsContext.Provider>
  );
};
