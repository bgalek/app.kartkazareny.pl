import { LanguageValue } from './LanguageValue';

export interface Product {
  id: string;
  name: LanguageValue;
  unit: LanguageValue;
  categoryId: string;
}
