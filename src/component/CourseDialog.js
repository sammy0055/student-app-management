import { useState } from "react";
import polyData from "../JSON/polyData.json";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import Alart from "./Alert";
import { getCourse, updateCourse } from "./apiCalls";
import { useContexts } from "../Statemgnt/Context";
import { AddCourse } from "./apiCalls";

function CourseDialog({
  openDialog,
  setOpenDialog,
  text,
  setText,
  formcontrolBTN,
  selectedCouse,
  disableField,
  setDisableField,
}) {
  const [open, setOpen] = useState(false);
  const [alerterror, setAlerterror] = useState("");
  const [progress, setProgress] = useState(false);
  const [{ token }, dispatch] = useContexts();
  const {
    course_code,
    course_title,
    credit_unit,
    level,
    department,
    semester,
    section,
  } = text;

  const { departments, sections, levels, semesters } = polyData;

  const handleSubmit = () => {
    setProgress(true);
    AddCourse(text, token)
      .then((res) => {
        dispatch({ type: "AddCourse", value: res?.data?.data });
        setProgress(false);
        setOpenDialog(false);
      })
      .catch((err) => {
        setAlerterror(err?.response?.data?.message);
        setProgress(false);
        setOpen(true);
      });
  };

  const handleEdit = () => {
    setProgress(true);
    updateCourse(text, token)
      .then((res) => {
        setProgress(false);
        setOpenDialog(false);
      })
      .catch((err) => {
        setAlerterror(err?.response?.data?.message);
        setProgress(false);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpen(false);
    setDisableField(false);
  };

  const getCourses = () => {
    setDisableField(true);
    setOpen(false);
    setProgress(true);
    let data = { department, semester, level };
    setProgress(true);
    getCourse(data, token)
      .then((res) => {
        let i = 1;
        res?.data?.data.forEach((course) => {
          course.id = Math.floor(Math.random() * 100000000);
          course.sn = i++;
        });
        dispatch({ type: "AddCourse", value: res?.data?.data });
        setProgress(false);
        setDisableField(false);
        setOpenDialog(false);
      })
      .catch((err) => {
        setAlerterror(err?.response?.data?.message);
        setProgress(false);
        setOpen(true);
      });
  };

  return (
    <>
      <div>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Course Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Alart
                alertopen={open}
                alertsetOpen={setOpen}
                alertmessage={alerterror}
              />
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="course_code"
              disabled={disableField}
              value={course_code}
              onChange={(e) =>
                setText({ ...text, course_code: e.target.value })
              }
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              label="course_title"
              type="text"
              disabled={disableField}
              value={course_title}
              onChange={(e) =>
                setText({ ...text, course_title: e.target.value })
              }
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              label="credit_unit"
              type="number"
              disabled={disableField}
              value={credit_unit}
              onChange={(e) =>
                setText({ ...text, credit_unit: e.target.value })
              }
              fullWidth
              variant="standard"
            />
            <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                section
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                disabled={disableField}
                value={section}
                onChange={(e) => setText({ ...text, section: e.target.value })}
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
            <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                department
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={department}
                onChange={(e) =>
                  setText({ ...text, department: e.target.value })
                }
                label="semester"
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
            <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                semester
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={semester}
                onChange={(e) => setText({ ...text, semester: e.target.value })}
                label="semester"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {semesters.map((item) => (
                  <MenuItem key={item.id} value={item.semester}>
                    {item.semester}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={level}
                onChange={(e) => setText({ ...text, level: e.target.value })}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            {progress ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={
                  formcontrolBTN === "getCourse"
                    ? getCourses
                    : formcontrolBTN === "AddCourse"
                    ? handleSubmit
                    : formcontrolBTN === "updateCourse"
                    ? handleEdit
                    : handleSubmit
                }
              >
                {formcontrolBTN === "getCourse"
                  ? "getCourse"
                  : formcontrolBTN === "AddCourse"
                  ? "AddCourse"
                  : formcontrolBTN === "updateCourse"
                  ? "updateCourse"
                  : ""}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default CourseDialog;
