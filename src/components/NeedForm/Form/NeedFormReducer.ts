import { Category } from "../../../@types/helpers/Category";
import { Product } from "../../../@types/helpers/Product";

export interface FormState {
  product: Product | null;
  category: Category;
  amount: string;
}

export enum ActionType {
  PRODUCT_CHANGE,
  CATEGORY_CHANGE,
  AMOUNT_CHANGE,
  RESET,
}

interface ReducerAction {
  type: ActionType;
  payload: FormState | Product | Category | string | null;
}

export const reducer = (state: FormState, action: ReducerAction): FormState => {
  switch (action.type) {
    case ActionType.PRODUCT_CHANGE:
      const productPayload = action.payload as Product | null;

      return {
        ...state,
        product: productPayload,
        category: productPayload?.category || state.category,
      };

    case ActionType.CATEGORY_CHANGE:
      const categoryPayload = action.payload as Category;
      let response = { ...state, category: categoryPayload };

      if (state.product?.category.id !== categoryPayload.id) {
        response.product = null;
      }

      return response;

    case ActionType.AMOUNT_CHANGE:
      const amountPayload = action.payload as string;
      return { ...state, amount: amountPayload };

    case ActionType.RESET:
      const resetPayload = action.payload as FormState;
      return resetPayload;
  }
};
