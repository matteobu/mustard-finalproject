const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const s3 = require("./s3");
const db = require("./sql/db.js");
const { uploader } = require("./upload");

// const csurf = require("csurf");
// DATABASE
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
const updateBioRoute = require("./routes/update-bio");
const lastThreeUsersRoute = require("./routes/lastThreeUsers");
const frndshpRoute = require("./routes/check-friendship");
const manageFriendshipRoute = require("./routes/manage-friendship");

// ROUTES
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use("/registration", registrationRoute);
app.use("/login", loginRoute);
app.use("/reset-code", sendCodeRoute);
app.use("/reset-password", resetPasswordRoute);
app.use("/update-bio", updateBioRoute);
app.use("/lastThreeUsers", lastThreeUsersRoute);
app.use("/check-friendship", frndshpRoute);
app.use("/manage-friendship", manageFriendshipRoute);

app.get("/logout", function (req, res) {
    // console.log("req.session", req.session);
    req.session = null;
    // console.log("req.session", req.session);
    res.redirect("/");
});
app.get("/user/id.json", function (req, res) {
    res.json({
        userID: req.session.userID,
    });
});

app.get("/userList/:input", function (req, res) {
    // console.log("SEARCH FOR USERS SERVER SIDE IS WORKING", req.params.input);
    db.allMatchUsers(req.params.input).then(({ rows }) => {
        res.json({
            rows,
        });
    });
});
app.get("/bikerz/:id.json", function (req, res) {
    // console.log("SEARCH FOR USERS SERVER SIDE IS WORKING", req.params.id);
    db.userInfoProfile(req.params.id).then(({ rows }) => {
        res.json({
            rows,
        });
    });
});

app.get("/user.json", function (req, res) {
    db.usersStarInformation(req.session.userID).then((result) => {
        const { id, first, last, pic_url, bio, email } = result.rows[0];
        res.json({
            userID: id,
            first: first,
            last: last,
            imageUrl: pic_url,
            bio: bio,
            email: email,
        });
    });
});

app.post("/upload-pic", uploader.single("file"), s3.upload, (req, res) => {
    let userID = req.session.userID;
    const { filename } = req.file;
    let url = `https://s3.amazonaws.com/spicedling/${filename}`;
    if (req.file) {
        db.uploadImages(url, userID).then((response) => {
            res.json({ success: true, url: url });
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.get("/friends.json", async function (req, res) {
    let userID = req.session.userID;
    db.reduxFriendhipCheck(userID).then(({ rows }) => {
        res.json({
            rows,
        });
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("Ehi, I'm listening 🤟: ");
});
