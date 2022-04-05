import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { Need } from '../../../@types/helpers/Need';

interface Props {
  needs: Need[];
}

export const NeedsTable = ({ needs }: Props): ReactElement => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>Zgłaszający</TableCell>
          <TableCell>Kategoria</TableCell>
          <TableCell>Produkt</TableCell>
          <TableCell>Ilość</TableCell>
        </TableHead>
        <TableBody>
          {needs.map((row) => (
            <TableRow key={`${row.name}-${row.productId}`}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.categoryId}</TableCell>
              <TableCell>{row.productId}</TableCell>
              <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
