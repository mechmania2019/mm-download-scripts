const AWS = require("aws-sdk");

const mongoose = require("mongoose");
const authenticate = require("mm-authenticate")(mongoose);

const { send, buffer } = require("micro");

const s3 = new AWS.S3({
  params: { Bucket: "mechmania2019" }
});

module.exports = authenticate(async (req, res) => {
  console.log(req.url);
  try {
    if (req.url === "/") {
      const key = req.url.slice(1);
      const data = s3
          .getObject({Key: `scripts/${key}`})
          .createReadStream();
      data.pipe(res);
      return;
    }
  } catch(e) {
    send(res, 400, `Error: ${e}`);
    return;
  }
  
  send(res, 400, "Error: no / in url");
  return;
});