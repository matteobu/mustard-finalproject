const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const s3 = require("./s3");
const db = require("./sql/db.js");
const { uploader } = require("./upload");

// Socket.io SETUP
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

// const csurf = require("csurf");
// DATABASE
// server/sql/db.js
// COOKIE SESSION
const cookieSession = require("cookie-session");
// COOKIE SESSION APP USE
// app.use(
//     cookieSession({
//         secret: "I'm always hungry",
//         maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
//         sameSite: true,
//     })
// );

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
// app.use(csurf());

// ROUTES REQUIRE
const registrationRoute = require("./routes/registration");
const loginRoute = require("./routes/login");

// ROUTES
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use("/registration", registrationRoute);
app.use("/login", loginRoute);

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
app.get("/logout", function (req, res) {
    // console.log("req.session", req.session);
    req.session = null;
    // console.log("req.session", req.session);
    res.redirect("/");
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("Ehi, I'm listening 🤟: ");
});
// const onlineUsers = {};
io.on("connection", async (socket) => {
    // ⬇⬇⬇⬇ USERID and SOCKET ID ⬇⬇⬇⬇

    const userID = socket.request.session.userID;

    console.log(
        `socket id ${socket.id} with userID ${userID} is now connected`
    );

    socket.on("user-profile", () => {
        db.usersStarInformation(userID).then(({ rows }) => {
            io.emit("all info from user", rows);
        });
    });
    socket.on("allRoutes", () => {
        db.findRoutes().then(({ rows }) => {
            // console.log({ rows });
            io.emit("all routes from DB", rows);
        });
    });
    socket.on("specific route", (location) => {
        // console.log("SOCKET ALL ROUTES ACTIVATED", location);
        db.findLocationRoutes(location).then(({ rows }) => {
            // console.log("specific route from DB", { rows });
            io.emit("specific routes from DB", rows);
        });
    });

    socket.on("route-profile", (routeID) => {
        // console.log("SOCKET ROUTE PROFILE ACTIVATED", routeID);
        db.infoRouteProfile(routeID).then(({ rows }) => {
            // console.log("specific route from DB", { rows });
            io.emit("route profile info", rows);
        });
    });
    socket.on("route added to fav", (routeID) => {
        // console.log("SOCKET ROUTE PROFILE ACTIVATED", routeID);
        db.makeFavorite(userID, routeID).then(({ rows }) => {
            // console.log("specific route from DB", { rows });
            io.emit("insert route on fav", rows);
        });
    });
    socket.on("remove from fav", (routeID) => {
        // console.log("SOCKET ROUTE PROFILE ACTIVATED", routeID);
        db.removeFavorite(userID, routeID).then(() => {
            db.checkFavorites(userID).then(({ rows }) => {
                // console.log("specific route from DB", { rows });
                io.emit("user's fav", rows);
            });
        });
    });
    socket.on("favorite route for my User", () => {
        // console.log("SOCKET ROUTE PROFILE ACTIVATED", userID);
        db.checkFavorites(userID).then(({ rows }) => {
            // console.log("specific route from DB", { rows });
            io.emit("user's fav", rows);
        });
    });

    socket.on("newPvtMessage", ({ routeID, message }) => {
        console.log(`message`, message);
        db.insertPrivateMessage(userID, routeID, message).then(({ rows }) => {
            console.log("id :>> ", rows[0].id);
            let idForLastMessage = rows[0].id;
            db.lastPrivateMessage(idForLastMessage).then(({ rows }) => {
                // console.log("rows :>> ", rows);
                io.emit("addPvtChatMsg", rows[0]);
            });
        });
    });

    socket.on("private chat opened", ({ otherUserID, userID }) => {
        console.log("otherUserID :>> ", otherUserID);
        db.lastThenPrivateMessages(userID, otherUserID).then(({ rows }) => {
            console.log("LAST THEN MESSAGES :>> ", rows);
            io.emit("most recent pvt messages", rows);
        });
    });
});
