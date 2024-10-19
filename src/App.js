import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ShiftForm from "./components/forms/shiftForms/ShiftForm";
import ShiftTable from "./components/tables/shiftTables/ShiftTable";
import CycleForm from "./components/forms/cycleForms/CycleForm";
import CycleTable from "./components/tables/cycleTables/CycleTable";

function App() {
  const [shifts, setShifts] = useState([]);
  const [cycles, setCycles] = useState([]);

  const addShift = (shift) => {
    setShifts([...shifts, shift]);
  };

  const addCycle = (cycle) => {
    setCycles([...cycles, cycle]);
  };

  const deleteCycle = (cycleNumber) => {
    setCycles(cycles.filter((cycle) => cycle.cycleNumber !== cycleNumber));
  };

  const deleteShift = (shiftNumber) => {
    setShifts(shifts.filter((shift) => shift.shiftNumber !== shiftNumber));
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        mt: 4,
        textAlign: "left",
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Typography variant="h4" component="h1" align="left" gutterBottom>
        SHIFT ARRANGEMENT
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} size={6}>
          <Card
            sx={{
              p: 2,
              border: 1,
              borderColor: "transparent",
              borderRadius: 2,
            }}
          >
            <CardHeader
              title="Determine New Shifts"
              titleTypographyProps={{ variant: "h5", align: "left" }}
            />
            <CardContent>
              <ShiftForm addShift={addShift} />
            </CardContent>
            <CardContent>
              <ShiftTable shifts={shifts} deleteShift={deleteShift} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} size={6}>
          <Card
            sx={{
              p: 2,
              border: 1,
              borderColor: "transparent",
              borderRadius: 2,
            }}
          >
            <CardHeader
              title="Determine New Cycles"
              titleTypographyProps={{ variant: "h5", align: "left" }}
            />
            <CardContent>
              <CycleForm addCycle={addCycle} />
            </CardContent>
            <CardContent>
              <CycleTable cycles={cycles} deleteCycle={deleteCycle} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
