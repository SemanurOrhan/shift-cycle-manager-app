import React from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';

export default function CycleTable({ cycles }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cycle Number</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Start Date</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cycles.map((cycle, index) => (
            <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
              <TableCell align="center">{cycle.cycleNumber}</TableCell>
              <TableCell align="center">{cycle.startDate}</TableCell>
              <TableCell align="center">{cycle.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
