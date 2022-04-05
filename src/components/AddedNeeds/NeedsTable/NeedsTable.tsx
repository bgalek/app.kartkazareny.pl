import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ProductNeed } from "../../../@types/helpers/ProductNeed";
import { Language } from "../../../@types/shared/Language";

interface Props {
  needs: ProductNeed[];
}

export const NeedsTable = ({ needs }: Props): ReactElement => {
  const { t, i18n } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Zgłaszający</TableCell>
            <TableCell>Kategoria</TableCell>
            <TableCell>Produkt</TableCell>
            <TableCell>Ilość</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {needs.map((row) => (
            <TableRow key={`${row.name}-${row.id}`}>
              <TableCell>{row.volunteer}</TableCell>
              <TableCell>
                {row.category.name[i18n.language as Language]}
              </TableCell>
              <TableCell>{row.name[i18n.language as Language]}</TableCell>
              <TableCell>
                {`${row.amount} ${row.unit[i18n.language as Language]}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
