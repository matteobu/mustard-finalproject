const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
// const csurf = require("csurf");
// DATABASE
// const db = require("./sql/db.js");
// server/sql/db.js
// COOKIE SESSION
const cookieSession = require("cookie-session");
// COOKIE SESSION APP USE
app.use(
    cookieSession({
        secret: "I'm always hungry",
        maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
        sameSite: true,
    })
);
// app.use(csurf());

// ROUTES REQUIRE
const registrationRoute = require("./routes/registration");
const loginRoute = require("./routes/login");
const sendCodeRoute = require("./routes/reset-code");
const resetPasswordRoute = require("./routes/reset-password");
const uploadPicRoute = require("./routes/upload-pic");

// ROUTES
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use("/registration", registrationRoute);
app.use("/login", loginRoute);
app.use("/reset-code", sendCodeRoute);
app.use("/reset-password", resetPasswordRoute);
app.use("/upload-pic", uploadPicRoute);
app.get("/user/id.json", function (req, res) {
    res.json({
        usersID: req.session.usersID,
    });
});
app.get("/user.json", function (req, res) {
    //MOCKING THE RES.JSON RESPONSE
    res.json({
        usersID: 1,
        first: "matteo",
        last: "mustard",
        imageUrl: "img/profile-pic/default.png",
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("Ehi, I'm listening 🤟: ");
});
