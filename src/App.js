import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ShiftForm from "./components/ShiftForm";
import ShiftTable from "./components/ShiftTable";
import CycleForm from "./components/CycleForm";
import CycleTable from "./components/CycleTable";

function App() {
  const [shifts, setShifts] = useState([]);
  const [cycles, setCycles] = useState([]);

  const addShift = (shift) => {
    setShifts([...shifts, shift]);
  };

  const addCycle = (cycle) => {
    setCycles([...cycles, cycle]);
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
        SHIFT AND CYCLE MANAGEMENT
      </Typography>

      {/* İki kartı aynı satırda yerleştirmek için MUI Grid yapısı */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
      >
        {/* Shift Management Kartı */}
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
              <ShiftTable shifts={shifts} />
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
              <CycleTable cycles={cycles} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
