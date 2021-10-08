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
const updateBio = require("./routes/update-bio");

// ROUTES
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use("/registration", registrationRoute);
app.use("/login", loginRoute);
app.use("/reset-code", sendCodeRoute);
app.use("/reset-password", resetPasswordRoute);
app.use("/update-bio", updateBio);

app.get("/user/id.json", function (req, res) {
    res.json({
        usersID: req.session.usersID,
    });
});
app.get("/user.json", function (req, res) {
    db.usersStarInformation(req.session.usersID).then((result) => {
        const { id, first, last, pic_url, bio, email } = result.rows[0];
        res.json({
            usersID: id,
            first: first,
            last: last,
            imageUrl: pic_url,
            bio: bio,
            email: email,
        });
    });
});

app.post("/upload-pic", uploader.single("file"), s3.upload, (req, res) => {
    let usersID = req.session.usersID;
    const { filename } = req.file;
    let url = `https://s3.amazonaws.com/spicedling/${filename}`;
    if (req.file) {
        db.uploadImages(url, usersID).then((response) => {
            res.json({ success: true, url: url });
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("Ehi, I'm listening 🤟: ");
});
