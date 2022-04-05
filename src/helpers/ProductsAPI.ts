import { Category } from "../@types/helpers/Category";
import { Product } from "../@types/helpers/Product";
import productData from "../../products_data.json";
import categoriesData from "../../categories_data.json";

export const getProducts = (): Product[] => Object.entries(productData.items).map(it => ({ ...it[1], id: it[0] }));

export const getCategories = (): Category[] => categoriesData.items;
