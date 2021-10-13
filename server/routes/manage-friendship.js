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
    // console.log("req.params on manage-friendship : >>", req.params);
    // console.log("req.body  on manage-friendship : >>", req.body);
    // console.log("req.session  on manage-friendship : >>", req.session);

    // req.params { step: '2' }
    // req.body  { userID: 3, otherUserID: '202' }
    // req.session  { userID: 3, loginDone: true }
    let { step } = req.params;
    let { userID, otherUserID } = req.body;

    if (step == 0) {
        console.log("STEP 0");
        db.makeFriendship(userID, otherUserID).then(({ rows }) => {
            console.log(rows.accepted);
            if (rows[0].accepted == false) {
                res.json({
                    accepted: false,
                    step: 1,
                });
            }
        });
    }
    if (step == 1) {
        console.log("STEP 1");

        db.deleteFriendship(userID, otherUserID).then(({ rows }) => {
            console.log(rows.accepted);
            if (rows.length == 0) {
                res.json({
                    step: 0,
                });
            }
        });
    }
    if (step == 2) {
        console.log("STEP 2");

        db.confirmFriendship().then(({ rows }) => {
            console.log(rows.accepted);
            if (rows[0].accepted == true) {
                res.json({
                    accepted: true,
                    step: 3,
                });
            }
        });
    }
    if (step == 3) {
        console.log("STEP 3");

        // db.makeFriendship(userID, otherUserID).then(({ rows }) => {
        //     console.log(rows.accepted);
        //     if (rows[0].accepted == false) {
        //         res.json({
        //             accepted: false,
        //         });
        //     }
        // });
    }
});

module.exports = router;
