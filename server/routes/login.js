const express = require("express");
const router = express.Router();
// import ReactDOM from "react-dom";

const db = require("../sql/db.js");
const { compare } = require("bcryptjs");

// const {
//     requireLoggedInUser,
//     requireLoggedOutUser,
//     requireNoSignature,
//     requireSignature,
// } = require("../server/middleware");

router.use((req, res, next) => {
    console.log("LOGIN ROUTES");
    // console.log("req.method: ", req.method);
    // console.log("req.url: ", req.url);
    next();
});

router.post("/", function (req, res) {
    console.log("SESSION VALUE ON POST LOGIN:>> ", req.body);
    const { email, password } = req.body;
    // console.log("req.body :>> ", req.body);

    db.listID(email)
        .then(function (result) {
            // console.log("result :>> ", result);
            if (result.rowCount === 0) {
                res.json({ success: false });
            } else {
                // console.log("result FROM LIST ID:>> ", result);

                compare(password, result.rows[0].password).then((match) => {
                    console.log("match :>> ", match);
                    if (match) {
                        req.session.usersID = result.rows[0].id;
                        req.session.loginDone = true;
                        res.json({ success: true });
                        // ReactDOM.render(
                        //     <div className="logo-navbar">
                        //         <img src="/logoBPw.png" alt="logo" />
                        //     </div>,
                        //     document.querySelector("main")
                        // );
                        //         db.listSignature(req.session.usersID)
                        //             .then((value) => {
                        //                 // console.log(
                        //                 //     "result.rows[0].signature :>> ",
                        //                 //     value
                        //                 // );
                        //                 if (value.rows.length) {
                        //                     // console.log("LA FIRMA ESISTE");
                        //                     req.session.signatureDone = true;
                        //                     res.redirect("/thanks");
                        //                 } else {
                        //                     res.redirect("/petition");
                        //                 }
                        //             })
                        //             .catch((err) => {
                        //                 console.log(
                        //                     "error in list Signature :>> ",
                        //                     err
                        //                 );
                        //             });
                        //     } else if (match != true) {
                        //         let wrong = `< < password or email incorrect, please try again or register > >`;
                        //         res.render("login", {
                        //             wrong,
                        //             layout: "main",
                        //         });
                    }
                });
            }
        })
        .catch(function (err) {
            console.log("ERROR IN POST LOGIN:>> ", err);
            res.json({ success: false });
        });
});

module.exports = router;
