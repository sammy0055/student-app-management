import { useState } from "react";
import {
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  DataGrid,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useContexts } from "../Statemgnt/Context";
import CourseDialog from "./CourseDialog";
//import MaterialTable from "@material-table/core";
//import MaterialTable from 'material-table'

const columns = [
  { field: "sn", headerName: "ID", width: 70 },
  {
    field: "course_code",
    title: "Course Code",
    width: 130,
  },
  { field: "course_title", title: "Course Title", width: 130 },
  {
    field: "credit_unit",
    title: "Credit Unit",
    type: "number",
    width: 90,
  },
  {
    field: "level",
    title: "level",
    sortable: false,
    width: 70,
  },

  { field: "department", title: "department", width: 130 },
  { field: "semester", title: "semester", width: 130 },
  { field: "section", title: "section", width: 130 },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const courseField = {
  course_code: "",
  course_title: "",
  credit_unit: "",
  level: "",
  department: "",
  semester: "",
  section: "",
};

function TableCourse(props) {
  const [cedit, setCedit] = useState(courseField);
  const [openDialog, setOpenDialog] = useState(false);
  const [formcontrolBTN, setFormcontrolBTN] = useState("");
  const [selectedCouse, setSelectedCouse] = useState("");
  const [disableField, setDisableField] = useState(false);
  const [{ courses }] = useContexts();

  const handleEdit = (e) => {
    const [texts] = courses.filter((course) => course.id === e.id);
    console.log("eeeeeeee");
    setCedit(texts);
    setFormcontrolBTN("updateCourse");
    setOpenDialog(true);
  };

  const select = (e) => {
    const [texts] = courses.filter((course) => course.id === e.id);
    setSelectedCouse(texts);
    console.log("eeeeeeee", e.id);
  };

  const openForm = () => {
    setFormcontrolBTN("getCourse");
    setOpenDialog(true);
    setDisableField(true)
  };

  const openFormAdd = () => {
    setFormcontrolBTN("AddCourse");
    setOpenDialog(true);
  };
  return (
    <>
      <CourseDialog
        text={cedit}
        setText={setCedit}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        formcontrolBTN={formcontrolBTN}
        selectedCouse={selectedCouse}
        disableField={disableField}
        setDisableField={setDisableField}
      />
      <div>
        <Button variant="outlined" sx={{ margin: "20px" }} onClick={openForm}>
          getCourse
        </Button>

        <Button
          variant="outlined"
          sx={{ margin: "20px" }}
          onClick={openFormAdd}
        >
          AddCourse
        </Button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          title="welcom"
          rows={courses}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowDoubleClick={handleEdit}
          onRowClick={select}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </>
  );
}

export default TableCourse;
