const { write, read, updateOne } = require("../db/dbfunctions");
const { Course } = require("../db/schema");

exports.addCourse = (req, res) => {
  let data = {
    uid: req.user.uid,
    course_code: req.body.course_code,
    course_title: req.body.course_title,
    credit_unit: req.body.credit_unit,
    level: req.body.level,
    semester: req.body.semester,
    department: req.body.department,
    section: req.body.section,
  };
  read(Course, data)
    .then((response) => {
      if (response.length !== 0) {
        return res.status(404).json({ message: "course already exist" });
      } else {
        write(Course, data)
          .then((response) =>
            res.status(200).json({ message: "successfull", data: response })
          )
          .catch((err) => res.status(500).json({ message: err.message }));
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getCourse = (req, res) => {
  read(Course, req.body)
    .then((response) => {
      if (response.length !== 0) {
        res.status(200).json({ message: "successful", data: response });
      } else {
        res.status(404).json({ message: "Course does not exists" });
      }
    })
    .catch((err) =>
      res.status(500).json({ code: "error", message: err.message })
    );
};

exports.updateCourse = (req, res) => {
  updateOne(Course, req.body, req.body._id).then((response) =>
    res.status(200).json({ message: "successfull", data: response })
  ).catch(err => res.status(500).json({error:"error", message:err.message}))
};
