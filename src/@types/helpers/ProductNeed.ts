import { Product } from "./Product";

export interface ProductNeed extends Product {
  volunteer: string;
  amount: number;
}
