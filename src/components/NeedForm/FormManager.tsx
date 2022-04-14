import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Stack } from "@mui/material";
import { Category } from "../../@types/helpers/Category";
import { Product } from "../../@types/helpers/Product";
import { NeedsContext } from "../../contexts/NeedsContext";
import { getCategories, getProducts } from "../../helpers/ProductsAPI";
import { Wrapper } from "../Wrapper";
import NeedForm from "./Form/NeedForm";
import { VolunteerField } from "./Form/VolunteerField";
import { FormHeader } from "./FormHeader";

export const FormManager = (): ReactElement => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { addNeed, assignVolunteer, volunteer } = useContext(NeedsContext);

  const handleVolunteerChange = (data: string) => {
    if (data !== volunteer) {
      assignVolunteer(data);
    }
  };

  const readCategories = useCallback(() => {
    setCategories(getCategories());
  }, []);

  const readProducts = useCallback(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    readCategories();
    readProducts();
  }, []);

  return (
    <>
      <Wrapper sx={{ paddingTop: "0px" }}>
        <Stack spacing={5}>
          <FormHeader />
          <VolunteerField onChange={handleVolunteerChange} value={volunteer} />
        </Stack>
      </Wrapper>
      <NeedForm
        onSubmit={addNeed}
        categories={categories}
        products={products}
      />
    </>
  );
};
