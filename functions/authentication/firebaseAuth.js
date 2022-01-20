const admin = require("firebase-admin");
const serviceAccount = require("../config/student-management-app-329f1-firebase-adminsdk-cixyo-7a23993fec.json");
const firebaseConfig = require("../config/firebaseConfig.json");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { sendMail } = require("../TwilioSendgrid/sendgridfuc");

initializeApp(firebaseConfig);
const _auth = getAuth();
const _logIn = (email, password) => {
  return signInWithEmailAndPassword(_auth, email, password);
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

const signUp = ({
  email,
  emailVerified,
  phoneNumber,
  password,
  displayName,
  photoURL,
  disabled,
}) => {
  return auth.createUser({
    email,
    emailVerified,
    phoneNumber,
    password,
    displayName,
    photoURL,
    disabled,
  });
};

const courseAdviser_customClaim = (uid) => {
  return auth.setCustomUserClaims(uid, { courseAdviser: true });
};

const HOD_customClaim = (uid) => {
  return auth.setCustomUserClaims(uid, { hod: true });
};

const admin_claim = (uid) => {
  return auth.setCustomUserClaims(uid, { admin: true });
};

const emailVerification = (email) => {
  return auth.generateEmailVerificationLink(email);
};

const passwordReset = (email) => {
  return auth.generatePasswordResetLink(email);
};

module.exports = {
  signUp,
  courseAdviser_customClaim,
  HOD_customClaim,
  admin_claim,
  _logIn,
  emailVerification,
  passwordReset,
  auth,
};
