const { write, read } = require("../db/dbfunctions");
const { Staffprofile, Studentprofile } = require("../db/schema");
const { sendMail } = require("../TwilioSendgrid/sendgridfuc");
const {
  signUp,
  _logIn,
  courseAdviser_customClaim,
  emailVerification,
  passwordReset,
} = require("./firebaseAuth");

const fbAuthError = (error, res) => {
  error.code == "app/invalid-credential"
    ? res.status(500).json({
        error: "error",
        message: "request failed, please check your internet connection",
      })
    : res.status(500).json({ error: "error", message: error.message });
};

const logIn = (req, res) => {
  let logInData = {
    email: req.body.email,
    password: req.body.password,
  };
  _logIn(logInData.email, logInData.password)
    .then((userCredential) => {
      let token = userCredential.user.stsTokenManager.accessToken;
      res.status(200).json({
        message: "successful",
        data: token,
      });
    })
    .catch((err) => {
      err.error == "Firebase: Error (auth/network-request-failed)."
        ? res.status(500).json({
            error: "error",
            message: "network error please check your internet connection",
          })
        : res.status(500).json({ message: err.message, error: err.code });
    });
};

const signUp_staff = (req, res) => {
  let authData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    other_name: req.body.other_name,
    position: req.body.position,
    position_verified: false,
    school: req.body.school,
    department: req.body.department,
    email: req.body.email,
    emailVerified: false,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    displayName: req.body.first_name,
    photoURL: "http://www.google.com/photos",
    disabled: false,
  };

  signUp(authData)
    .then((userRecord) => {
      authData.uid = userRecord.uid;
      write(Staffprofile, authData)
        .then((response) => {
          emailVerification(response.email);
          res.status(200).json({ message: "successful", data: response });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((error) => {
      fbAuthError(error, res);
    });
};

const signUp_student = (req, res) => {
  let picsKey = "";
  let authData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    other_name: req.body.other_name,
    date_of_birth: req.body.date_of_birth,
    state_of_origin: req.body.state_of_origin,
    LGA: req.body.LGA,
    mobile_numble: req.body.mobile_numble,
    school: req.body.school,
    department: req.body.department,
    program: req.body.program,
    section: req.body.level,
    level: req.body.level,
    mat_number: req.body.mat_number,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    parent_guardian_number: req.body.parent_guardian_number,
  };
  signUp(authData)
    .then((userRecord) => {
      authData.uid = userRecord.uid;
      authData.profile_pics = picsKey;
      write(Studentprofile, authData)
        .then((response) =>
          res.status(200).json({ message: "successful", data: response })
        )
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((error) => {
      fbAuthError(error, res);
    });
};

const verifyEmail = (req, res) => {
  emailVerification(req.user.email)
    .then((link) => {
      let data = {
        object: "from Admin",
        phrase: `please click the link to verify your email ${link}`,
      };
      sendMail(req.user.email, data.object, data.phrase, res);
    })
    .catch((error) => {
      fbAuthError(error, res);
    });
};

const resetPassword = (req, res) => {
  passwordReset(req.user.email)
    .then((link) => {
      let data = {
        object: "from Admin",
        phrase: `please click the link to reset your password ${link}`,
      };
      sendMail(req.user.email, data.object, data.phrase, res);
    })
    .catch((error) => {
      fbAuthError(error, res);
    });
};

const setRules_courseAdviser = (req, res) => {
  let data = { uid: req.params.uid };
  read(Staffprofile, data)
    .then((response) => {
      if (response.length !== 0) {
        let courseAdviser = response.find(
          (role) => role.position == "courseAdviser"
        );
        if (courseAdviser.length !== 0) {
          courseAdviser_customClaim(courseAdviser.uid)
            .then(() =>
              res
                .status(200)
                .json({ message: "successfull", data: courseAdviser })
            )
            .catch((err) =>
              res.status(500).json({ message: "error", error: err.message })
            );
        } else {
          res.status(500).json({ message: "user not found o" });
        }
      } else {
        res.status(500).json({ message: "user not found" });
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.setRules_hod = (req, res) => {
  let data = { uid: req.params.uid };
  read(Staffprofile, data)
    .then((response) => {
      if (response.length !== 0) {
        let hod = response.find((role) => role.position == "hod");
        if (hod.length !== 0) {
          HOD_customClaim(hod.uid)
            .then(() =>
              res.status(200).json({ message: "successfull", data: hod })
            )
            .catch((err) =>
              res.status(500).json({ message: err.message, error: "error" })
            );
        } else {
          res.status(500).json({ message: "user not found o" });
        }
      } else {
        res.status(500).json({ message: "user not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: err.message, error: "error" })
    );
};

module.exports = {
  signUp_staff,
  signUp_student,
  setRules_courseAdviser,
  verifyEmail,
  resetPassword,
  logIn,
};
