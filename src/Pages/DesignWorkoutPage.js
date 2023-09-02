
import React, { useEffect, useState } from "react";
import workouts from "../Data/workouts.json";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "../Components/card";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form } from "react-bootstrap";
function DesignWorkoutPage() {
  let workoutListArr = [];
  const [workout_type, setWorkout_type] = useState("cardio");
  const [noOfWorkouts, setNoOfWorkouts] = useState(8);
  const [onTime, setOnTime] = useState(40);
  const [offTime, setOffTime] = useState(20);
  const [sets, setSets] = useState(2);
  const [laps, setLaps] = useState(2);


  const [workout_arr, setWorkout_arr] = useState([]);
  const [workout_obj, setWorkout_obj] = useState({});


  const handleChange = (event) => {
    setWorkout_type(event.target.value);
    console.log(event.target.value);
  };
  const generateWorkout = () => {

    // console.log('sdasda', workouts)
    for (let i = 0; i < noOfWorkouts; i++) {
      // console.log('sdasda', workouts)
      let workout =
        workouts[workout_type][
        Math.floor(Math.random() * workouts[workout_type].length)
        ];
      if (workoutListArr.includes(workout)) i = i - 1;
      else workoutListArr.push(workout);
    }
    return workoutListArr
  }
  const handleClick = () => {

    setWorkout_arr(generateWorkout());
    mapToObject(workout_arr)
    workoutListArr = [];
  };
  const mapToObject = (arr) => {
    workout_obj['workouttype'] = workout_type;
    workout_obj['workouts'] = arr;
    workout_obj['onTime'] = onTime;
    workout_obj['offTime'] = offTime;
    workout_obj['sets'] = sets;
    workout_obj['laps'] = laps;

    return workout_obj
  }
  return (
    <div className="workout-layout">
      <div className="type-style">
        {/* <div style={{fontSize:"20px"}}>Workout Designer</div> */}
        <FormControl >
          <InputLabel id="demo-simple-select-label">Workout Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={workout_type}
            label="Type of workout"
            onChange={handleChange}
            size={'small'}
            // prop sx={{ width: 200 }}

          >
            <MenuItem value="strength">Strength</MenuItem>
            <MenuItem value="cardio">Cardio</MenuItem>
            <MenuItem value="core">Core</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <LocalizationProvider
            size="small"
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              label="Start Date"
              required
              slotProps={{ textField: { size: 'small' } }}
              // value={memberDetails.dob}
              // onChange={(newValue) => (memberDetails['dob'] = new Date(newValue))}
              // prop sx={{ width: 200 }}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Specifications</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            prop sx={{ width: 200 }}
            >
            <FormControlLabel value="bodyweight" control={<Radio size="small" />} label="Body Weight" />
            <FormControlLabel value="equipment" control={<Radio size="small" />} label="Equipment Based" />
            <FormControlLabel value="both" control={<Radio size="small" />} label="Combined" />
            {/* <FormControlLabel
              value="disabled"
              disabled
              control={<Radio size="small" />}
              label="other"
              size={'small'}
            /> */}
          </RadioGroup>
        </FormControl>
        <FormControl>
          <TextField
            id="standard-basic"
            label="No of workouts"
            type="number"
            size={"small"}
            value={noOfWorkouts}
            onChange={(e) => setNoOfWorkouts(e.target.value)}
          />
</FormControl>
        <div className="timing-record">
          <TextField
            id="standard-basic"
            label="On Time"
            type="number"
            size={"small"}
            onChange={(e) => setOnTime(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Off Time"
            type="number"
            size={"small"}
            onChange={(e) => setOffTime(e.target.value)}
          />
        </div>
        <div className="timing-record"  >
          <TextField
            id="standard-basic"
            label="Sets"
            type="number"
            size={"small"}
            onChange={(e) => setSets(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Laps"
            type="number"
            size={"small"}
            onChange={(e) => setLaps(e.target.value)}
          />
        </div>
        <Button className="btn-style" variant="contained" onClick={handleClick}>
          Frame Workout
        </Button>
      </div>



      <Card workout_obj={workout_obj} />
    </div>
  );
}
export default DesignWorkoutPage;

