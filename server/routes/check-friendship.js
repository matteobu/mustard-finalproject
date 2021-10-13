const express = require("express");
const router = express.Router();
const db = require("../sql/db.js");

router.use((req, res, next) => {
    console.log("CHECK FRIENDSHIP ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.get("/:otherUserID", function (req, res) {
    let { otherUserID } = req.params;
    let { userID } = req.session;
    console.log("GET REQUEST ON /friendship : >>");
    db.checkFriendship(userID, otherUserID).then(({ rows }) => {
        console.log({ rows });
        if (rows.length == 0) {
            res.json({
                step: 0,
            });
        } else if (userID == rows[0].sender_id && rows[0].accepted == false) {
            res.json({
                step: 1,
                accepted: false,
            });
        } else if (
            otherUserID == rows[0].sender_id &&
            rows[0].accepted == false
        ) {
            res.json({
                step: 2,
                accepted: false,
            });
        } else {
            res.json({
                step: 3,
                accepted: true,
            });
        }

        // if (userID == rows[0].sender_id) {
        // }
        // res.json({
        //     rows,
        // });

        //   rows: [ { id: 1, sender_id: 3, recipient_id: 202, accepted: false } ]
    });
});
module.exports = router;
