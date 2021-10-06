const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

exports.sendEmail = (toAddress, subject, text) => {
    return ses
        .sendEmail({
            Source: secrets.AWS_EMAIL,
            Destination: {
                ToAddresses: [toAddress],
                //cc
                //bc
            },
            Message: {
                Body: {
                    Text: {
                        Data: text,
                    },
                    // HTML:{}
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("CODE SENT!"))
        .catch((err) => console.log("error in sending the email", err));
};
