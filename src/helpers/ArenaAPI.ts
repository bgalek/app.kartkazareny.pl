import { FormSaveData } from "../@types/helpers/FormSaveData";
import { Need } from "../@types/helpers/Need";
import { NEEDS_CONTROLLER } from "../consts";

const createPostOptions = (body: any) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const postNeeds = (needs: Need[]): Promise<any> => {
  const saveData: FormSaveData[] = needs.map((item) => ({
    category: item.category.name.PL,
    itemName: item.name.PL,
    count: item.amount,
  }));

  return Promise.all(
    saveData.map((element) =>
      fetch(NEEDS_CONTROLLER, createPostOptions(element))
    )
  );
};
