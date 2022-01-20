const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const fs = require("fs");
const busBoy = require("busboy");
const path = require("path");
const os = require("os");

const region = process.env.AWS_BUCKET_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const uploadImage = (file, filename) => {
  //const filestream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: filename,
  };

  return s3.upload(uploadParams).promise();
};

const getfileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
};

const addProfile = (req, res) => {
  let imageFileName;
  const bb = busBoy({ headers: req.headers });

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    if (mimeType == "image/jpeg" || mimeType == "image/png") {
      let fileIndex = filename.split(".").length - 1;
      const imageExtension = filename.split(".")[fileIndex];
      imageFileName = `${Math.round(
        Math.random() * 10000000000
      )}.${imageExtension}`;

      file
        .on("data", (data) => {
          uploadImage(data, imageFileName)
            .then((result) => {
              return result.Key;
            })
            .catch((err) =>
              res
                .status(500)
                .json({ error: err.originalError?.code, message: err })
            );
        })
        .on("close", () => {
          console.log("thank you image upload successfull");
        });
    } else {
      res.status(500).json({
        error: "wrong file type",
        message: "imageformat must be jpeg or png",
      });
    }
  });
  bb.end(req.rawBody);
};

const getProfilepics = (req, res) => {
  const key = req.params.key;
  const readStream = getfileStream(key);
  readStream.pipe(res);
};

module.exports = { addProfile, getProfilepics };
