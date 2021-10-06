const express = require("express");
const router = express.Router();
const path = require("path");
const { hash } = require("../sql/bc.js");
const db = require("../sql/db.js");

// const {
//     requireLoggedInUser,
//     requireLoggedOutUser,
//     requireNoSignature,
//     requireSignature,
// } = require("../server/middleware");

router.use((req, res, next) => {
    // console.log("REGISTER ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.post("/", function (req, res) {
    // console.log("SESSION VALUE ON POST REGISTER:>> ", req.body);
    const { first, last, email, password } = req.body;

    hash(password)
        .then((hashedPsw) => {
            db.addUser(first, last, email, hashedPsw).then((result) => {
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
});

module.exports = router;
