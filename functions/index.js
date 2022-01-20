const functions = require("firebase-functions");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

const { addProfile, getProfilepics } = require("./storage/storageFunc");
const {
  signUp_staff,
  signUp_student,
  setRules_hod,
  logIn,
  verifyEmail,
  setRules_courseAdviser,
  resetPassword,
} = require("./authentication/authentication");
const {
  staff_signUp_Auth_middleware,
  student_signUp_Auth_middleware,
  FBAuth_updateCourse,
  addCourse_middleware,
  FBAuth_addResult,
  addResult_middle,
  FBAuth_approveResult,
  FBAuth_App,
  FBAuth,
} = require("./validation/validate");
const {
  addCourse,
  getCourse,
  updateCourse,
} = require("./course-result-mangement/uploadCoures");
const {
  addResult,
  updateResult,
} = require("./course-result-mangement/addStudentScore");
const { aprroveResult } = require("./course-result-mangement/resultFuc");
const { getCurentUser } = require("./userManagement/userFuc");

// mongoDB
const mongoUrl = "mongodb://localhost/Student-Portal-DB";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err, "connection failed to db"));

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.static("."));
app.use(express.json());

//image upload route
app.post("/image", addProfile);
app.get("/images/:key", getProfilepics);

//signup route
app.post("/signUp_staff", staff_signUp_Auth_middleware, signUp_staff);
app.post("/signUp_student", student_signUp_Auth_middleware, signUp_student);

app.post("/logIn", logIn);

//addCourse and StudentScore route.......................
app.post("/addCourse", addCourse_middleware, FBAuth, addCourse);
app.post("/getCourse", FBAuth, getCourse);
app.put("/updateCourse", FBAuth, updateCourse);
app.post("/addResult", addResult_middle, FBAuth_addResult, addResult);
app.put("/updateResult", addResult_middle, FBAuth_addResult, updateResult);
app.post("/approveResult", FBAuth_approveResult, aprroveResult);

//get user....................................
app.get("/getCurentUser", FBAuth, getCurentUser);

//set rolls route
app.get("/verifyEmail", FBAuth_App, verifyEmail);
app.get("/resetpassword", FBAuth_App, resetPassword);
app.get("/setRules/:uid", setRules_courseAdviser);

//app.listen(3001, () => console.log("listening on port 3001"));
exports.api = functions.https.onRequest(app);
