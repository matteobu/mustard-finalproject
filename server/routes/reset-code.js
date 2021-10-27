const express = require("express");
const router = express.Router();
// import ReactDOM from "react-dom";
const ses = require("../ses.js");
const db = require("../sql/db.js");
const { compare } = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");

// const {
//     requireLoggedInUser,
//     requireLoggedOutUser,
//     requireNoSignature,
//     requireSignature,
// } = require("../server/middleware");

router.use((req, res, next) => {
  
    next();
});

router.post("/", function (req, res) {
    const { email } = req.body;

    db.listID(email)
        .then(function (result) {
            if (result.rowCount === 0) {
                res.json({ success: false });
            } else {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                db.addCode(email, secretCode);
                let toAddress = email;
                let subject = "Bikepacking Irgendwo - Reset Password";
                let text = "please insert this code " + secretCode;

                ses.sendEmail(toAddress, subject, text);
                res.json({ success: true });
            }
        })
        .catch(function (err) {
            res.json({ success: false });
        });
});

module.exports = router;
