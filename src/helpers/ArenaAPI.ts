import { FormSaveData } from "../@types/helpers/FormSaveData";
import { Need } from "../@types/helpers/Need";
import { NEEDS_CONTROLLER } from "../consts";

export const postNeeds = (needs: Need[]): Promise<any> => {
  const saveData: FormSaveData[] = needs.map((item) => ({
    volunteer: item.volunteer,
    category: item.category.name.PL,
    product: item.name.PL,
    amount: item.amount,
    unit: item.unit.PL,
  }));

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ needs: saveData }),
  };

  return fetch(NEEDS_CONTROLLER, options);
};
