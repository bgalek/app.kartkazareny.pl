import { Category } from "../@types/helpers/Category";
import { Product } from "../@types/helpers/Product";
import productData from "../../products_data.json";
import categoriesData from "../../categories_data.json";

export const getProducts = (): Product[] => productData.items;

export const getCategories = (): Category[] => categoriesData.items;
