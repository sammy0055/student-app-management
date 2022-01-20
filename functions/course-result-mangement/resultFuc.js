const { read, updatMany } = require("../db/dbfunctions");
const { Studentresult } = require("../db/schema");

exports.aprroveResult = (req, res) => {
  init_data = {
    level: req.body.level,
    section: req.body.section,
    semester: req.body.semester,
    department: req.body.department,
  };

  read(Studentresult, init_data).then((data) => {
    if (data.length !== 0) {
      const unApprovedResult = data.filter((ilter) => ilter.approved === false);
      if (unApprovedResult.length !== 0) {
        updatMany(Studentresult, { approved: true }, init_data)
          .then((_data) =>
            res.status(200).json({ message: "successfull", data: _data })
          )
          .catch((err) =>
            res.status(500).json({ error: "error", message: err.message })
          );
      } else {
        res.status(200).json({ message: "result already approved" });
      }
    } else {
      res.status(404).json({ error: "result does not exist" });
    }
  });
};
