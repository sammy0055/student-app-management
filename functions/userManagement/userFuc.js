const { read } = require("../db/dbfunctions");
const { Staffprofile, Studentprofile } = require("../db/schema");

exports.getCurentUser = (req, res) => {
  let Model = "";
  req.user.courseAdviser ? (Model = Staffprofile) : (Model = Studentprofile);
  read(Model, { uid: req.user.uid })
    .then((response) => {
      res.status(200).json({ message: "successfull", data: response });
    })
    .catch((err) => {
      res.status(500).json({ error: "error", message: err.message });
    });
};
