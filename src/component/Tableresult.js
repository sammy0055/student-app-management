import React from "react";
import {
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  DataGrid,
} from "@mui/x-data-grid";

const columns = [
  { field: "sn", headerName: "S/N", width: 70 },
  { field: "last_name", headerName: "LAST NAME", width: 130 },
  { field: "first_name", headerName: "FIRST NAME", width: 130 },
  { field: "mat_number", headerName: "MAT NO", width: 130 },
  { field: "course_code", headerName: "COURSE CODE", width: 130 },
  { field: "course_title", headerName: "COURSE TITLE", width: 130 },
  { field: "total_score", headerName: "SCORE", width: 130, type: "number" },
];

const row = [
  {
    id: 1,
    first_name: "joy",
    last_name: "amaka",
    uploader_uid: "hgju",
    student_uid: "vItyFcIxb1dCg2VG0yNjeRsfS3D2",
    mat_number: "despt&#x2F;hnd&#x2F;mech&#x2F;2021&#x2F;14318",
    level: "hnd 1",
    section: "2021",
    semester: "first",
    department: "mechanical engineering",
    studentGrades: [
      {
        id:2,
        course_code: "GNS302",
        course_title: "English Language",
        credit_unit: 2,
        total_score: 70,
      },
      {
        id:3,
        course_code: "MATH311",
        course_title: "ADVANCED CALCULUS",
        credit_unit: 2,
        total_score: 70,
      },
      {
        id:4,
        course_code: "MEC311",
        course_title: "ENGINERR IN SOCIETY",
        credit_unit: 2,
        total_score: 60,
      },
      {
        id:5,
        course_code: "EED413",
        course_title: "ENTERPRENUARSHIP",
        credit_unit: 3,
        total_score: 67,
      },
      {
        id:6,
        course_code: "MEC312",
        course_title: "ENGINERRING DESIGN",
        credit_unit: 3,
        total_score: 63,
      },
      {
        id:7,
        course_code: "MEC313",
        course_title: "STRENGTH OF MATERIAL",
        credit_unit: 3,
        total_score: 77,
      },
      {
        id:8,
        course_code: "MEC314",
        course_title: "INSTRUMENTATION & CONTROL",
        credit_unit: 3,
        total_score: 60,
      },
      {
        id:9,
        course_code: "MEC315",
        course_title: "MECHANICS OF MACHINE",
        credit_unit: 3,
        total_score: 68,
      },
      {
        id:10,
        course_code: "MEC316",
        course_title: "CAD/CAM",
        credit_unit: 3,
        total_score: 65,
      },
      {
        id:11,
        course_code: "ICT101",
        course_title: "COMPUTER PROGRAMMING",
        credit_unit: 2,
        total_score: 61,
      },
      {
        id:12,
        course_code: "MEC300",
        course_title: "AUTOTRONICS/MECHATRONICS",
        credit_unit: 3,
        total_score: 65,
      },
    ],
  },
];

const ui = []

function Tableresult(props) {
  return (
    <div  style={{ height: 400, width: "100%" }}>
      <DataGrid
        title="welcom"
        rows={row[0].studentGrades}
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default Tableresult;
