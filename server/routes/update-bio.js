const express = require("express");
const router = express.Router();
const db = require("../sql/db.js");

router.use((req, res, next) => {
 
    next();
});

router.post("/", function (req, res) {
    const { draftBio } = req.body;
    let userID = req.session.userID;

    db.updateBio(userID, draftBio).then((result) => {
        if (result.rowCount === 0) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

module.exports = router;
