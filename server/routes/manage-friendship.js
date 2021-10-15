const express = require("express");
const router = express.Router();
const db = require("../sql/db.js");

router.use((req, res, next) => {
    console.log("MANAGE FRIENDSHIP ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.post("/:step", function (req, res) {
    let { step } = req.params;
    let { otherUserID } = req.body;
    let { userID } = req.session;
    if (step == 0) {
        // console.log("STEP 0");
        db.makeFriendship(userID, otherUserID).then(({ rows }) => {
            // console.log(rows.accepted);
            if (rows[0].accepted == false) {
                res.json({
                    accepted: false,
                    step: 1,
                });
            }
        });
    }
    if (step == 1) {
        // console.log("STEP 1");

        db.deleteFriendship(userID, otherUserID).then(({ rows }) => {
            // console.log(rows.accepted);
            if (rows.length == 0) {
                res.json({
                    accepted: null,
                    step: 0,
                });
            }
        });
    }
    if (step == 2) {
        // console.log("STEP 2");

        db.confirmFriendship().then(({ rows }) => {
            // console.log(rows.accepted);
            if (rows[0].accepted == true) {
                res.json({
                    accepted: true,
                    step: 3,
                });
            }
        });
    }
});

module.exports = router;
