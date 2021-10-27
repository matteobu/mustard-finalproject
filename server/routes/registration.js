const express = require("express");
const router = express.Router();
const { hash } = require("../sql/bc.js");
const db = require("../sql/db.js");

router.use((req, res, next) => {
    next();
});

router.post("/", async function (req, res) {
    const { first, last, email, password } = req.body;
    const hashedPsw = await hash(password).catch((err) => console.log(err));
    const resultDB = await db.addUser(first, last, email, hashedPsw);
    let id = resultDB.rows[0].id;
    req.session.userID = id;
    req.session.loginDone = true;
    res.json({ success: true, userID: id });
});

module.exports = router;
