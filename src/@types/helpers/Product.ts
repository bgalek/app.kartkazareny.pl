import { Category } from "./Category";
import { LanguageValue } from "./LanguageValue";

export interface Product {
  id: string;
  name: LanguageValue;
  unit: LanguageValue;
  category: Category;
}
