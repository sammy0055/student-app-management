const { write, read, updateOne } = require("../db/dbfunctions");
const { Studentresult } = require("../db/schema");

const gradeCheker = (n) => {
  if (n >= 75) {
    return (score = { grade: "A", point: 4.0 });
  } else if (n >= 70 && n <= 74) {
    return (score = { grade: "AB", point: 3.5 });
  } else if (n >= 65 && n <= 69) {
    return (score = { grade: "B", point: 3.25 });
  } else if (n >= 60 && n <= 64) {
    return (score = { grade: "BC", point: 3.0 });
  } else if (n >= 55 && n <= 59) {
    return (score = { grade: "C", point: 2.75 });
  } else if (n >= 50 && n <= 54) {
    return (score = { grade: "CD", point: 2.5 });
  } else if (n >= 45 && n <= 49) {
    return (score = { grade: "D", point: 2.25 });
  } else if (n >= 40 && n <= 44) {
    return (score = { grade: "E", point: 2.0 });
  } else if (n >= 0 && n <= 39) {
    return (score = { grade: "F", point: 0.0 });
  } else {
    return "none";
  }
};

const calculations = (studentGrades, result) => {
  for (let i = 0; i <= studentGrades.length - 1; i++) {
    let grade = gradeCheker(studentGrades[i].total_score);
    studentGrades[i].grade = grade;
  }

  const total_Cu = studentGrades.reduce(
    (initial, ilter) => initial + ilter.credit_unit,
    0
  );

  const total_WGP = studentGrades
    .map((item) => item.credit_unit * item.grade.point)
    .reduce((initial, ilter) => initial + ilter, 0);

  const CGPA = total_WGP / total_Cu;
  const total_CGPA = CGPA.toPrecision(3);
  const _result = {
    total_Cu: total_Cu,
    total_WGP: total_WGP,
    total_CGPA: total_CGPA,
  };
  result.result = _result;
};

exports.addResult = (req, res) => {
  const result = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    student_uid: req.body.student_uid,
    uploader_uid: req.user.uid,
    mat_number: req.body.mat_number,
    level: req.body.level,
    section: req.body.section,
    semester: req.body.semester,
    department: req.body.department,
    studentGrades: req.body.studentGrades,
  };

  const { studentGrades } = result;
  calculations(studentGrades, result);
  checkanduplaod(req, res, result);
};

exports.updateResult = (req, res) => {
  const result = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    student_uid: req.body.student_uid,
    uploader_uid: req.user.uid,
    mat_number: req.body.mat_number,
    level: req.body.level,
    section: req.body.section,
    semester: req.body.semester,
    department: req.body.department,
    studentGrades: req.body.studentGrades,
  };

  const { studentGrades } = result;
  calculations(studentGrades, result);
  checkandupdate(req, res, result);
};

const checkanduplaod = (req, res, result) => {
  init_data = {
    student_uid: req.body.student_uid,
    level: req.body.level,
    section: req.body.section,
    semester: req.body.semester,
    department: req.body.department,
  };
  read(Studentresult, init_data).then((_data) => {
    if (_data.length == 0) {
      write(Studentresult, result)
        .then((data) =>
          res.status(200).json({ message: "successfull", data: data })
        )
        .catch((err) => res.status(500).json({ error: err.message }));
    } else {
      res.status(500).json({
        error: `${_data[0].department} ${_data[0].level} ${_data[0].semester} semester result for ${_data[0].section} academy section, has been uploaded for ${_data[0].first_name} ${_data[0].last_name} `,
      });
    }
  });
};

const checkandupdate = (req, res, result) => {
  init_data = {
    student_uid: req.body.student_uid,
    level: req.body.level,
    section: req.body.section,
    semester: req.body.semester,
    department: req.body.department,
  };
  read(Studentresult, init_data).then((_data) => {
    if (_data[0].approved === false) {
      updateOne(Studentresult, result, _data[0]._id)
        .then((data) =>
          res.status(200).json({ message: "successfull", data: data })
        )
        .catch((err) => res.status(500).json({ error: err.message }));
    } else {
      res.status(404).json({
        error: "error",
        message: "you can not update a result that is already approved",
      });
    }
  });
};
