const aws = require("aws-sdk");
const fs = require("fs");
let secrets;

if (process.env.NODE_ENV) {
    // running in production
    secrets = process.env;
} else {
    // running locally
    secrets = require("../secrets");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    if (!req.file) {
        //NO FILE OR ERRO ON MULTER PROCESS
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;
    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();
    promise
        .then(() => {
            // console.log("OUR IMAGE IS ON THE UNIVERSE");
            next();

            fs.unlink(path, () => {
                // console.log("a string i did not understand");
            });
        })
        .catch((err) => {
            console.log("err :>> ", err);
        });
};
