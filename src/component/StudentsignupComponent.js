import "../styles/StudentsignupComponent.css";
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
import polyData from "../JSON/polyData.json";
import BasicDatePicker from "./BasicDatePicker";
import { signup_student } from "./apiCalls";
import Alart from "./Alert";
import LinearProgress from "@mui/material/LinearProgress";

const style = {
  TextField: {
    margin: "20px",
  },
};

const studentData = {
  first_name: "",
  last_name: "",
  otherName: "",
  email: "",
  password: "",
  repeat_password: "",
  position: "",
  school: "",
  department: "",
  program: "",
  level: "",
  section: "",
  LGA: "",
  state_of_origin: "",
  mat_number: "",
  date_of_birth: "",
  phoneNumber: "",
  parent_guardian_number: "",
};

function StudentsignupComponent({ value }) {
  const theme = useTheme();
  const [input, setInput] = useState(studentData);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [alerterror, setAlerterror] = useState("");
  const [progress, setProgress] = useState(false);
  //polyData

  const { schools, departments, programs, sections, levels, positions } =
    polyData;

  const {
    first_name,
    last_name,
    otherName,
    email,
    password,
    repeat_password,
    position,
    school,
    department,
    program,
    level,
    section,
    LGA,
    state_of_origin,
    mat_number,
    phoneNumber,
    parent_guardian_number,
  } = input;

  const handleSubmiteform = (e) => {
    setInput({ ...input, date_of_birth: dateOfBirth });
    setProgress(true);
    setOpen(false);
    signup_student(input)
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
      <div
        className="TextFieldrap"
        value={value}
        index={0}
        dir={theme.direction}
      >
        <div className="TextFieldminirap">
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="First Name"
            variant="standard"
            helperText={error?.context?.key === "first_name" && error?.message}
            error={error?.context?.key === "first_name" ? true : false}
            value={first_name}
            onChange={(e) => setInput({ ...input, first_name: e.target.value })}
          />
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="Last Name"
            variant="standard"
            helperText={error?.context?.key === "last_name" && error?.message}
            error={error?.context?.key === "last_name" ? true : false}
            value={last_name}
            onChange={(e) => setInput({ ...input, last_name: e.target.value })}
          />
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="State Of Origin"
            variant="standard"
            helperText={
              error?.context?.key === "state_of_origin" && error?.message
            }
            error={error?.context?.key === "state_of_origin" ? true : false}
            value={state_of_origin}
            onChange={(e) =>
              setInput({ ...input, state_of_origin: e.target.value })
            }
          />
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120, margin: "20px" }}
          >
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, margin: "20px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Section
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              //helperText={error?.context?.key === "section" && error?.message}
              error={error?.context?.key === "section" ? true : false}
              value={section}
              onChange={(e) => setInput({ ...input, section: e.target.value })}
              label="section"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {sections.map((item) => (
                <MenuItem key={item.id} value={item.section}>
                  {item.section}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            helperText={error?.context?.key === "password" && error?.message}
            error={error?.context?.key === "password" ? true : false}
            value={password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>
        <div className="TextFieldminirap">
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="Other Name"
            variant="standard"
            value={otherName}
            onChange={(e) => setInput({ ...input, otherName: e.target.value })}
          />
          <BasicDatePicker
            value={dateOfBirth}
            setValue={setDateOfBirth}
            style={style.TextField}
          />
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="L G A"
            variant="standard"
            helperText={error?.context?.key === "LGA" && error?.message}
            error={error?.context?.key === "LGA" ? true : false}
            value={LGA}
            onChange={(e) => setInput({ ...input, LGA: e.target.value })}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, margin: "20px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Program
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              //helperText={error?.context?.key === "program" && error?.message}
              error={error?.context?.key === "program" ? true : false}
              value={program}
              onChange={(e) => setInput({ ...input, program: e.target.value })}
              label="program"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {programs.map((item) => (
                <MenuItem key={item.id} value={item.program}>
                  {item.program}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, margin: "20px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Level
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              //helperText={error?.context?.key === "level" && error?.message}
              error={error?.context?.key === "level" ? true : false}
              value={level}
              onChange={(e) => setInput({ ...input, level: e.target.value })}
              label="level"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {levels.map((item) => (
                <MenuItem key={item.id} value={item.level}>
                  {item.level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="Repeat password"
            variant="standard"
            type="password"
            helperText={
              error?.context?.key === "repeat_password" && error?.message
            }
            error={error?.context?.key === "repeat_password" ? true : false}
            value={repeat_password}
            onChange={(e) =>
              setInput({ ...input, repeat_password: e.target.value })
            }
          />
        </div>
        <div className="TextFieldminirap">
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="Mobile Number"
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
            label="Parent/Guardian Number"
            variant="standard"
            helperText={
              error?.context?.key === "parent_guardian_number" && error?.message
            }
            error={
              error?.context?.key === "parent_guardian_number" ? true : false
            }
            value={parent_guardian_number}
            onChange={(e) =>
              setInput({ ...input, parent_guardian_number: e.target.value })
            }
          />
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="Mat No"
            variant="standard"
            helperText={error?.context?.key === "mat_number" && error?.message}
            error={error?.context?.key === "mat_number" ? true : false}
            value={mat_number}
            onChange={(e) => setInput({ ...input, mat_number: e.target.value })}
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
          <TextField
            sx={style.TextField}
            id="standard-basic"
            label="Email"
            variant="standard"
            helperText={error?.context?.key === "email" && error?.message}
            error={error?.context?.key === "email" ? true : false}
            value={email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </div>
      </div>
      <div className="Pics_Btn">
        <Button
          variant="outlined"
          disabled={progress}
          sx={style.TextField}
          onClick={handleSubmiteform}
        >
          submit
        </Button>
      </div>
    </>
  );
}

export default StudentsignupComponent;
