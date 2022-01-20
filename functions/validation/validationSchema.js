const Joi = require("joi");
exports.addResultSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  student_uid: Joi.string().required(),
  uploader_uid: Joi.string().required(),
  mat_number: Joi.string().required(),
  level: Joi.string().required(),
  section: Joi.string().required(),
  semester: Joi.string().required(),
  department: Joi.string().required(),
  studentGrades: Joi.array().required(),
});

exports.addCourseSchema = Joi.object({
  course_code: Joi.string().required(),
  course_title: Joi.string().required(),
  credit_unit: Joi.number().required(),
  level: Joi.string().required(),
  section: Joi.string().required(),
  semester: Joi.string().required(),
  department: Joi.string().required(),
});

exports.studentSign_upSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  otherName: Joi.string(),
  school: Joi.string().required(),
  date_of_birth: Joi.string().required(),
  state_of_origin: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  department: Joi.string().required(),
  program: Joi.string().required(),
  section: Joi.string().required(),
  level: Joi.string().required(),
  mat_number: Joi.string().required(),
  parent_guardian_number: Joi.string().required(),
  LGA: Joi.string().required(),
  position: Joi.string().required(),
});

exports.staffSign_upSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  position: Joi.string().required(),
  school: Joi.string().required(),
  department: Joi.string().required(),
});
