const express = require("express");
const router = express.Router();
const db = require("../sql/db.js");

router.use((req, res, next) => {
    // console.log("LAST THREE USERS ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.get("/", function (req, res) {
    db.lastThreeUsers().then(({ rows }) => {
        // console.log({ rows });
        res.json({
            rows,
        });
    });
});

module.exports = router;
