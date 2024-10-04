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
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const shiftSchema = z.object({
  shiftNumber: z.number().min(1).max(10),
  entryTime: z.string().min(1, "Entry Time is required"),
  exitTime: z.string().min(1, "Exit Time is required"),
});

export default function ShiftForm({ addShift }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shiftSchema),
  });

  const [entryTime, setEntryTime] = useState(null);
  const [exitTime, setExitTime] = useState(null);

  const onSubmit = (data) => {
    // Zaman değerlerini ISO formatında güncelle
    data.entryTime = entryTime ? entryTime.toISOString().slice(11, 16) : "";
    data.exitTime = exitTime ? exitTime.toISOString().slice(11, 16) : "";
    addShift(data);
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
              <InputLabel htmlFor="shiftNumber">Shift Number</InputLabel>
              <FormControl fullWidth error={!!errors.shiftNumber}>
                <Select
                  fullWidth
                  {...register("shiftNumber", { valueAsNumber: true })}
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
                {errors.shiftNumber && (
                  <span>{errors.shiftNumber.message || "Shift Number must be between 1-10"}</span>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3} size={6}>
              <InputLabel htmlFor="entryTime">Entry Time</InputLabel>
              <TimePicker
                label="hh:mm"
                value={entryTime}
                onChange={(newValue) => {
                  setEntryTime(newValue);
                  setValue("entryTime", newValue ? newValue.toISOString() : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.entryTime}
                    helperText={errors.entryTime ? errors.entryTime.message : ""}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} sm={3} size={6}>
              <InputLabel htmlFor="exitTime">Exit Time</InputLabel>
              <TimePicker
                label="hh:mm"
                value={exitTime}
                onChange={(newValue) => {
                  setExitTime(newValue);
                  setValue("exitTime", newValue ? newValue.toISOString() : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.exitTime}
                    helperText={errors.exitTime ? errors.exitTime.message : ""}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} size={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ height: "100%", backgroundColor: "black" }}
              >
                Add Shift
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </LocalizationProvider>
  );
}
