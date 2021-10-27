const express = require("express");
const router = express.Router();
const db = require("../sql/db.js");

router.use((req, res, next) => {

    next();
});

router.post("/:step", function (req, res) {
    let { step } = req.params;
    let { otherUserID } = req.body;
    let { userID } = req.session;
    if (step == 0) {
        db.makeFriendship(userID, otherUserID).then(({ rows }) => {
            if (rows[0].accepted == false) {
                res.json({
                    accepted: false,
                    step: 1,
                });
            }
        });
    }
    if (step == 1) {

        db.deleteFriendship(otherUserID, userID).then(({ rows }) => {
            if (rows.length == 0) {
                res.json({
                    step: 0,
                });
            }
        });
    }
    if (step == 2) {
        let { userID } = req.session;

        db.confirmFriendship(otherUserID, userID).then(({ rows }) => {
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
