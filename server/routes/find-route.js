const express = require("express");
const router = express.Router();
const db = require("../sql/db.js");

router.use((req, res, next) => {
  
    next();
});

router.get("/", function (req, res) {
    db.findRoutes().then(({ rows }) => {
        res.json({
            rows,
        });
    });
});

module.exports = router;
