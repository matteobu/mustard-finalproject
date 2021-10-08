const express = require("express");
const router = express.Router();
// import ReactDOM from "react-dom";

const db = require("../sql/db.js");
const { compare } = require("bcryptjs");

router.use((req, res, next) => {
    // console.log("LOGIN ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.post("/", function (req, res) {
    // console.log("SESSION VALUE ON POST LOGIN:>> ", req.body);
    const { email, password } = req.body;

    db.listID(email)
        .then(function (result) {
            if (result.rowCount === 0) {
                res.json({ success: false });
            } else {
                compare(password, result.rows[0].password).then((match) => {
                    // console.log("match :>> ", match);
                    if (match) {
                        req.session.usersID = result.rows[0].id;
                        req.session.loginDone = true;
                        res.json({ success: true });
                    }
                });
            }
        })
        .catch(function (err) {
            "ERROR IN POST LOGIN:>> ", err;
            res.json({ success: false });
        });
});

module.exports = router;
