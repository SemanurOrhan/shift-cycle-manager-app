import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";

export default function ShiftTable({ shifts, deleteShift }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Shift Number
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Entry Time
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Exit Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts.map((shift, index) => (
            <TableRow
              key={index}
              sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}
            >
              <TableCell align="center">{shift.shiftNumber}</TableCell>
              <TableCell align="center">{shift.entryTime}</TableCell>
              <TableCell align="center">{shift.exitTime}</TableCell>
              <TableCell align="center">
                <Button
                  variant="text"
                  size="small"
                  color="error"
                  onClick={() => deleteShift(shift.shiftNumber)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
