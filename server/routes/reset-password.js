const express = require("express");
const router = express.Router();
const { hash } = require("../sql/bc.js");

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
    console.log("RESET PASSWORD ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.post("/", function (req, res) {
    console.log("SESSION VALUE ON POST RESET PASSWORD:>> ", req.body);

    const { email, code, password } = req.body;

    db.checkCode(email).then((result) => {
        console.log("rows[0].code :>> ", result.rows[0].code);
        if (code == result.rows[0].code) {
            console.log("MATCH CODE TRUE");
            hash(password)
                .then((hashedPsw) => {
                    db.updateUserPsw(email, hashedPsw).then((result) => {
                        let id = result.rows[0].id;
                        req.session.usersID = id;
                        req.session.loginDone = true;
                        res.json({ success: true, usersID: id });
                    });
                })
                .catch((err) => {
                    res.json({ success: false });
                    console.log("ERROR IN INPUT VALUE:>> ", err);
                });
        }
    });

    // console.log("req.body :>> ", req.body);

    // db.listID(email)
    //     .then(function (result) {
    //         // console.log("result :>> ", result);
    //         if (result.rowCount === 0) {
    //             res.json({ success: false });
    //         } else {
    //             // console.log("result FROM LIST ID:>> ", result);

    //             compare(password, result.rows[0].password).then((match) => {
    //                 console.log("match :>> ", match);
    //                 if (match) {
    //                     req.session.usersID = result.rows[0].id;
    //                     req.session.loginDone = true;
    //                     res.json({ success: true });

    //                 }
    //             });
    //         }
    //     })
    //     .catch(function (err) {
    //         console.log("ERROR IN POST LOGIN:>> ", err);
    //         res.json({ success: false });
    //     });
});

module.exports = router;
