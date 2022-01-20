const { auth } = require("../authentication/firebaseAuth");
const { read } = require("../db/dbfunctions");
const { Staffprofile, Studentprofile } = require("../db/schema");
const {
  addResultSchema,
  addCourseSchema,
  studentSign_upSchema,
  staffSign_upSchema,
} = require("./validationSchema");

const verifyToken = (req, res) => {
  if (req.headers.authorization) {
    let idToken = req.headers.authorization;
    return auth.verifyIdToken(idToken);
  } else {
    console.error("no token found"),
      res.status(500).json({ message: "unauthorized" });
  }
};

const fbErrorcheck = (err, res) => {
  if (
    err.message ==
    "Error while making request: getaddrinfo ENOTFOUND www.googleapis.com. Error code: ENOTFOUND"
  ) {
    res.status(500).json({
      error: "error",
      message: "request failed please check your internet connection",
    });
  } else {
    res.status(500).json({ error: "error", message: err.message });
  }
};

exports.FBAuth = (req, res, next) => {
  verifyToken(req, res)
    .then((claim) => {
      req.user = claim;
      req.user.uid = claim.uid;
      next();
    })
    .catch((err) => fbErrorcheck(err, res));
};

exports.FBAuth_App = (req, res, next) => {
  verifyToken(req, res)
    .then((claim) => {
      req.user = claim;
      if (claim.email_verified) {
        res.status(200).json({ message: "email already verified" });
      } else {
        req.user.email = claim.email;
        next();
      }
    })
    .catch((err) => fbErrorcheck(err, res));
};

exports.staff_signUp_Auth_middleware = (req, res, next) => {
  const { error } = staffSign_upSchema.validate(req.body);
  !error ? next() : res.status(500).json({ error: error?.details });
};

exports.student_signUp_Auth_middleware = (req, res, next) => {
  const { error } = studentSign_upSchema.validate(req.body);
  !error ? next() : res.status(500).json({ error: error?.details });
};

exports.addCourse_middleware = (req, res, next) => {
  const { error } = addCourseSchema.validate(req.body);
  !error ? next() : res.status(500).json({ error: error?.details });
};

exports.addResult_middle = (req, res, next) => {
  const { error } = addResultSchema.validate(req.body);
  !error ? next() : res.status(500).json({ error: error?.details });
};

//approve result...........................................
exports.FBAuth_approveResult = (req, res, next) => {
  verifyToken(req, res)
    .then((claim) => {
      req.user = claim;
      if (claim.courseAdviser === true || claim.hod === true) {
        read(Staffprofile, { uid: claim.uid }).then((data) => {
          data.length !== 0 && data[0].department == req.body.department
            ? next()
            : res.status(500).json({
                error: `access denied, you can only perform actions related to your department `,
              });
        });
      } else {
        res.status(500).json({ error: "access denied" });
      }
    })
    .catch((err) => fbErrorcheck(err, res));
};

//addScore_validation.............................................
exports.FBAuth_addResult = (req, res, next) => {
  verifyToken(req, res)
    .then((claim) => {
      req.user = claim;
      if (claim.courseAdviser === true || claim.hod === true) {
        read(Staffprofile, { uid: claim.uid }).then((data) => {
          if (data.length !== 0 && data[0].department == req.body.department) {
            let studentData = {
              uid: req.body.student_uid,
              mat_number: req.body.mat_number,
            };
            read(Studentprofile, studentData).then((response) => {
              if (response.length !== 0) {
                next();
              } else {
                res
                  .status(404)
                  .json({ error: "student doesn't exist", response });
              }
            });
          } else {
            res.status(500).json({
              error: `access denied, you can only perform actions related to your department `,
            });
          }
        });
        req.user.uid = claim.uid;
      } else {
        res.status(500).json({ error: "access denied" });
      }
    })
    .catch((err) => fbErrorcheck(err, res));
};

exports.FBAuth_updateCourse = (req, res, next) => {
  if (req.headers.authorization) {
    let idToken = req.headers.authorization;
    auth
      .verifyIdToken(idToken)
      .then((claim) => {
        req.user = claim;
        if (claim.courseAdviser === true || claim.hod === true) {
          req.user.uid = claim.uid;
          read(Staffprofile, { uid: claim.uid })
            .then((data) => {
              if (data && data[0].department == req.body.department) {
                //res.status(200).json({ message: "successfull  ." });
                next();
              } else {
                res.status(500).json({
                  error:
                    "access denied, you can only upload courses related to your department",
                });
              }
            })
            .catch((err) => res.status(500).json({ error: err.message }));
        } else {
          res.status(500).json({
            error:
              "access denied, you must be a courseAdviser or an HOD to perform this action",
          });
        }
      })
      .catch((err) => fbErrorcheck(err, res));
  } else {
    console.error("no token found"),
      res.status(500).json({ error: "unauthorized" });
  }
};
