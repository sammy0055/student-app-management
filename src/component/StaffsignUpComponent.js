import React from "react";
import "../styles/staffsignupcomponent.css";
import { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import polyData from "../JSON/polyData.json";
import { signUp_staff } from "./apiCalls";
import Alart from "./Alert";

const style = {
  TextField: {
    margin: "20px",
  },
  FormControl: {
    margin: "20px",
    borderColor: "white",
    m: 1,
    minWidth: 120,
  },
};

const initData = {
  first_name: "",
  last_name: "",
  phoneNumber: "",
  password: "",
  repeat_password: "",
  email: "",
  position: "",
  school: "",
  department: "",
};

function StaffsignUpComponent({ value }) {
  const theme = useTheme();
  const [input, setInput] = useState(initData);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [alerterror, setAlerterror] = useState("");
  const [progress, setProgress] = useState(false);
  const {
    first_name,
    last_name,
    phoneNumber,
    password,
    repeat_password,
    email,
    position,
    school,
    department,
  } = input;
  const { schools, departments, positions } = polyData;

  const handleSubmiteform = () => {
    setProgress(true);
    setOpen(false);
    signUp_staff(input)
      .then((res) => {
        setProgress(false);
        console.log("rrrrrrrrrr", res.data);
      })
      .catch((err) => {
        setProgress(false);
        setOpen(true);
        setError(err?.response?.data?.error[0]);
        setAlerterror(err?.response?.data?.message);
        console.log("eeeeee", err?.response?.data);
      });
  };

  return (
    <>
      {progress && <LinearProgress />}
      <Alart
        alertopen={open}
        alertsetOpen={setOpen}
        alertmessage={alerterror}
      />
      <div className="Toprapper" value={value} index={0} dir={theme.direction}>
        <div className="Minirapper">
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="first_name"
            variant="standard"
            helperText={error?.context?.key === "first_name" && error?.message}
            error={error?.context?.key === "first_name" ? true : false}
            value={first_name}
            onChange={(e) => setInput({ ...input, first_name: e.target.value })}
          />

          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="last_name"
            variant="standard"
            helperText={error?.context?.key === "last_name" && error?.message}
            error={error?.context?.key === "last_name" ? true : false}
            value={last_name}
            onChange={(e) => setInput({ ...input, last_name: e.target.value })}
          />

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, margin: "20px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              School
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              //helperText={error?.context?.key === "school" && error?.message}
              error={error?.context?.key === "school" ? true : false}
              value={school}
              onChange={(e) => setInput({ ...input, school: e.target.value })}
              label="School"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {schools.map((item) => (
                <MenuItem key={item.id} value={item.school}>
                  {item.school}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="Minirapper">
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="phoneNumber"
            variant="standard"
            helperText={error?.context?.key === "phoneNumber" && error?.message}
            error={error?.context?.key === "phoneNumber" ? true : false}
            value={phoneNumber}
            onChange={(e) =>
              setInput({ ...input, phoneNumber: e.target.value })
            }
          />
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="email"
            variant="standard"
            helperText={error?.context?.key === "email" && error?.message}
            error={error?.context?.key === "email" ? true : false}
            value={email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, margin: "20px" }}>
            <InputLabel id="demo-simple-select-standard-label">Rule</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // helperText={error?.context?.key === "position" && error?.message}
              error={error?.context?.key === "position" ? true : false}
              value={position}
              onChange={(e) => setInput({ ...input, position: e.target.value })}
              label="School"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {positions.map((item) => (
                <MenuItem key={item.id} value={item.position}>
                  {item.position}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="Minirapper">
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="password"
            variant="standard"
            helperText={error?.context?.key === "password" && error?.message}
            error={error?.context?.key === "password" ? true : false}
            value={password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="repeat_password"
            variant="standard"
            helperText={
              error?.context?.key === "repeat_password" && error?.message
            }
            error={error?.context?.key === "repeat_password" ? true : false}
            value={repeat_password}
            onChange={(e) =>
              setInput({ ...input, repeat_password: e.target.value })
            }
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, margin: "20px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Deparment
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              error={error?.context?.key === "department" ? true : false}
              value={department}
              onChange={(e) =>
                setInput({ ...input, department: e.target.value })
              }
              label="department"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {departments.map((item) => (
                <MenuItem key={item.id} value={item.department}>
                  {item.department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <Button
        variant="outlined"
        disabled={progress}
        sx={style.TextField}
        onClick={handleSubmiteform}
      >
        submit
      </Button>
    </>
  );
}

export default StaffsignUpComponent;
