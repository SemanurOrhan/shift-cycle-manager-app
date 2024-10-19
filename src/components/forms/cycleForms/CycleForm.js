import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale"; 

const cycleSchema = z.object({
  cycleNumber: z.number().min(1).max(10),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
});

export default function CycleForm({ addCycle }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cycleSchema),
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onSubmit = useCallback((data) => {
    data.startDate = startDate ? startDate.toLocaleDateString("en-GB") : "";
    data.endDate = endDate ? endDate.toLocaleDateString("en-GB") : "";
    addCycle(data);
  }, [addCycle, startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enGB}>
      <Box
        sx={{
          border: "0px solid transparent",
          borderRadius: "8px",
          padding: "0px",
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "transparent",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} size={12}>
              <InputLabel htmlFor="cycleNumber">Cycle Number</InputLabel>
              <FormControl fullWidth error={!!errors.cycleNumber}>
                <Select
                  fullWidth
                  {...register("cycleNumber", { valueAsNumber: true })}
                  defaultValue={0}
                >
                   {Array.from({ length: 10 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
                </Select>
                {errors.cycleNumber && (
                  <span>{errors.cycleNumber.message || "Cycle Number must be between 1-10"}</span>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3} size={6}>
              <InputLabel htmlFor="startDate">Start Date</InputLabel>
              <DatePicker
                fullWidth
                label="DD/MM/YYYY"
                format="dd/MM/yyyy"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  setValue("startDate", newValue ? newValue.toLocaleDateString("en-GB") : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.startDate}
                    helperText={errors.startDate ? "Start Date is required" : ""}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} size={6}>
              <InputLabel htmlFor="endDate">End Date</InputLabel>
              <DatePicker
                fullWidth
                label="DD/MM/YYYY"
                format="dd/MM/yyyy"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  setValue("endDate",newValue ? newValue.toLocaleDateString("en-GB") : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.endDate}
                    helperText={errors.endDate ? "End Date is required" : ""}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} size={12}>
              <Button
                sx={{ height: "100%", backgroundColor: "black" }}
                variant="contained"
                type="submit"
                fullWidth
              >
                Add Cycle
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </LocalizationProvider>
  );
}
