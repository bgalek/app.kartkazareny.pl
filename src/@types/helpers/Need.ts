import { Product } from "./Product";

export interface Need extends Product {
  volunteer: string;
  amount: number;
}
