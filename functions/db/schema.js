const mongoose = require("mongoose");

const staff_profile_schema = new mongoose.Schema({
  uid: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  other_name: { type: String, required: false },
  email: { type: String, required: true },
  position: { type: String, required: true },
  school: { type: String, required: true },
  department: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const student_profile_schema = new mongoose.Schema({
  uid: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  other_name: { type: String, required: false },
  profile_pics: { type: String, required: false },
  email: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  state_of_origin: { type: String, required: true },
  LGA: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  parent_guardian_number: { type: String, required: true },
  school: { type: String, required: true },
  department: { type: String, required: true },
  program: { type: String, required: true },
  section: { type: String, required: true },
  level: { type: String, required: true },
  mat_number: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const course_schema = new mongoose.Schema({
  uid: { type: String, required: true },
  course_code: { type: String, maxlength: 6, required: true },
  course_title: { type: String, required: true },
  credit_unit: { type: Number, minlength: 1, maxlength: 1, required: true },
  level: { type: String, required: true },
  section: { type: String, required: true },
  semester: { type: String, required: true },
  department: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const studentResult = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  student_uid: { type: String, required: true },
  uploader_uid: { type: String, required: true },
  mat_number: { type: String, required: true },
  level: { type: String, required: true },
  section: { type: String, required: true },
  semester: { type: String, required: true },
  department: { type: String, required: true },
  studentGrades: { type: Array, required: true },
  result: { type: Object, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Studentresult = mongoose.model("Studentresult", studentResult);
const Course = mongoose.model("Course", course_schema);
const Staffprofile = mongoose.model("Staff_profile", staff_profile_schema);
const Studentprofile = mongoose.model(
  "Student_profile",
  student_profile_schema
);

module.exports = { Staffprofile, Studentprofile, Course, Studentresult };
