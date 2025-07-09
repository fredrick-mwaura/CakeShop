import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

function ResponsiveTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: '90%',
        margin: 'auto',
        mt: 3,
        boxShadow: 3,
        overflowX: 'auto',
        textAlign: 'center',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="TableHead" sx={{ fontWeight: 'bold' }}>
              Product Name
            </TableCell>
            <TableCell className="TableHead" sx={{ fontWeight: 'bold' }}>
              Christmas fruit cake
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Sizes</TableCell>
            <TableCell>1kg - 5kg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Prices</TableCell>
            <TableCell>Ksh. 2000 - Ksh. 10,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Availability</TableCell>
            <TableCell>In stock</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Delivery</TableCell>
            <TableCell>Home/office delivery Nairobi</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResponsiveTable;
