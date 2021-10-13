const express = require("express");
const router = express.Router();
const { hash } = require("../sql/bc.js");
const db = require("../sql/db.js");

router.use((req, res, next) => {
    console.log("RESET PASSWORD ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.post("/", function (req, res) {
    const { email, code, password } = req.body;
    resetPassword(email, code, password);
    async function resetPassword(email, code, password) {
        const result = await db.checkCode(email);

        // console.log("result :>> ", result);
        if (code == result.rows[0].code) {
            // console.log("before hashing :>> ", password);
            const hashedPsw = await hash(password);
            const resultDB = await db.updateUserPsw(email, hashedPsw);
            // console.log("resultDB :>> ", resultDB);

            let id = resultDB.rows[0].id;
            req.session.userID = id;
            req.session.loginDone = true;
            res.json({ success: true, userID: id });
        }
    }

    // db.checkCode(email).then((result) => {
    //     // console.log("rows[0].code :>> ", result.rows[0].code);
    //     if (code == result.rows[0].code) {
    //         // console.log("MATCH CODE TRUE");

    //         hash(password)
    //             .then((hashedPsw) => {
    //                 db.updateUserPsw(email, hashedPsw).then((result) => {
    //                     let id = result.rows[0].id;
    //                     req.session.userID = id;
    //                     req.session.loginDone = true;
    //                     res.json({ success: true, userID: id });
    //                 });
    //             })
    //             .catch((err) => {
    //                 res.json({ success: false });
    //                 console.log("ERROR IN INPUT VALUE:>> ", err);
    //             });
    //     }
    // });
});

module.exports = router;
