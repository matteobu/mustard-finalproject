const express = require("express");
const router = express.Router();
const { hash } = require("../sql/bc.js");
const db = require("../sql/db.js");

router.use((req, res, next) => {
    
    next();
});

router.post("/", async function (req, res) {
    const { email, code, password } = req.body;
    const result = await db.checkCode(email);

    if (code == result.rows[0].code) {
        const hashedPsw = await hash(password);
        const resultDB = await db.updateUserPsw(email, hashedPsw);

        let id = resultDB.rows[0].id;
        req.session.userID = id;
        req.session.loginDone = true;
        res.json({ success: true, userID: id });
    }
});

module.exports = router;

