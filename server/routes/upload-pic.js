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
    console.log("UPLOAD PIC ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.post("/", function (req, res) {
    console.log("SESSION VALUE ON POST UPLOAD PIC:>> ", req.body);
    const { usersID } = req.body;
    console.log("req.body :>> ", usersID);

    // db.listID(email)
    //     .then(function (result) {
    //         // console.log("result :>> ", result);
    //         if (result.rowCount === 0) {
    //             res.json({ success: false });
    //         } else {
    //             const secretCode = cryptoRandomString({
    //                 length: 6,
    //             });
    //             console.log("result FROM LIST ID:>> ", result);
    //             db.addCode(email, secretCode);
    //             let toAddress = email;
    //             let subject = "Bikepacking Irgendwo - Reset Password";
    //             let text = "please insert this code " + secretCode;

    //             ses.sendEmail(toAddress, subject, text);
    //             res.json({ success: true });
    //         }
    //     })
    //     .catch(function (err) {
    //         console.log("ERROR IN POST LOGIN:>> ", err);
    //         res.json({ success: false });
    //     });
});

module.exports = router;
