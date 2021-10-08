const express = require("express");
const router = express.Router();
const db = require("../sql/db.js");

router.use((req, res, next) => {
    // console.log("UPDATE BIO  ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.post("/", function (req, res) {
    // console.log("REQ.BODY VALUE ON UPDATE-BIO:>> ", req.body);
    const { draftBio } = req.body;
    // console.log("BIO DRAFT:>> ", draftBio);
    // console.log("req.session.usersID :>> ", req.session.usersID);
    let usersID = req.session.usersID;

    db.updateBio(usersID, draftBio).then((result) => {
        // console.log("result after db query updateBio :>> ", result);
        if (result.rowCount === 0) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
 
});

module.exports = router;
