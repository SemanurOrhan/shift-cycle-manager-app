import React, { useState } from "react";
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

  const onSubmit = (data) => {
    data.startDate = startDate ? startDate.toISOString().slice(0, 10) : "";
    data.endDate = endDate ? endDate.toISOString().slice(0, 10) : "";
    console.log(data);
    addCycle(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
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
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  setValue("startDate", newValue ? newValue.toISOString() : "");
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
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  setValue("endDate",newValue ? newValue.toISOString() : "");
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
