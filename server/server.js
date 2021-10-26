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
const sendCodeRoute = require("./routes/reset-code");
const resetPasswordRoute = require("./routes/reset-password");
// const findRouteRoute = require("./routes/find-route");
// const updateBioRoute = require("./routes/update-bio");
// const lastThreeUsersRoute = require("./routes/lastThreeUsers");
// const frndshpRoute = require("./routes/check-friendship");
// const manageFriendshipRoute = require("./routes/manage-friendship");

// ROUTES
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use("/registration", registrationRoute);
app.use("/login", loginRoute);
app.use("/reset-code", sendCodeRoute);
app.use("/reset-password", resetPasswordRoute);
// app.use("/find-route.json", findRouteRoute);

// app.use("/update-bio", updateBioRoute);
// app.use("/lastThreeUsers", lastThreeUsersRoute);
// app.use("/check-friendship", frndshpRoute);
// app.use("/manage-friendship", manageFriendshipRoute);

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
    // db.allMatchUsers(req.params.input).then(({ rows }) => {
    //     res.json({
    //         rows,
    //     });
    // });
});
app.get("/bikerz/:id.json", function (req, res) {
    // console.log("SEARCH FOR USERS SERVER SIDE IS WORKING", req.params.id);
    // db.userInfoProfile(req.params.id).then(({ rows }) => {
    //     res.json({
    //         rows,
    //     });
    // });
});

app.get("/user.json", function (req, res) {
    // db.usersStarInformation(req.session.userID).then((result) => {
    //     const { id, first, last, pic_url, bio, email } = result.rows[0];
    //     res.json({
    //         userID: id,
    //         first: first,
    //         last: last,
    //         imageUrl: pic_url,
    //         bio: bio,
    //         email: email,
    //     });
    // });
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

server.listen(process.env.PORT || 3001, function () {
    console.log("Ehi, I'm listening 🤟: ");
});
// const onlineUsers = {};
io.on("connection", async (socket) => {
    // ⬇⬇⬇⬇ USERID and SOCKET ID ⬇⬇⬇⬇

    const userID = socket.request.session.userID;
    // const { userID } = socket.request.session;
    // onlineUsers[socket.id] = userID;
    // if (!socket.request.session.userID) {
    //     return socket.disconnect(true);
    // }

    console.log(
        `socket id ${socket.id} with userID ${userID} is now connected`
    );
    // ⬇⬇⬇⬇ FRIENDS ⬇⬇⬇⬇
    // const { rows } = await db.friendsViaSocket(userID);
    // // console.log("friendsViaSocket on SERVER sez. io.on :>> ", rows);

    // ⬇⬇⬇⬇ ONLINE USERS & ONLINE FRIENDS ⬇⬇⬇⬇

    // onlineUsers[socket.id] = userID;
    // const onlineUserIDsArray = [...new Set(Object.values(onlineUsers))];

    // socket.on("disconnect", () => {
    //     delete onlineUsers[socket.id];
    // });

    socket.on("user-profile", () => {
        // console.log("SOCKET ALL ROUTES ACTIVATED");
        db.usersStarInformation(userID).then(({ rows }) => {
            // console.log({ rows });
            io.emit("all info from user", rows);
        });
    });
    socket.on("allRoutes", () => {
        // console.log("SOCKET ALL ROUTES ACTIVATED");
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
        console.log("SOCKET ROUTE PROFILE ACTIVATED", routeID);
        db.makeFavorite(userID, routeID).then(({ rows }) => {
            console.log("specific route from DB", { rows });
            // io.emit("route fav true", rows);
        });
    });
    socket.on("favorite route for my User", () => {
        console.log("SOCKET ROUTE PROFILE ACTIVATED", userID);
        db.checkFavorites(userID).then(({ rows }) => {
            console.log("specific route from DB", { rows });
            io.emit("user's fav", rows);
        });
    });

    // console.log("ONLINE USERS  :>> ", onlineUsers);
    // console.log("ONLINE USERS IDS ARRAY :>> ", onlineUserIDsArray);

    // db.onlineUserIDsArrayProfileInfo(onlineUserIDsArray).then(({ rows }) => {
    //     console.log("value ON SERVEr:>> ", rows);
    //     io.emit("onlineUsers", rows);
    // });

    //⬇⬇⬇⬇ EXAMPLE ON WHY SET IS IMPORTANT ⬇⬇⬇⬇
    // ONLINE USERS  :>>  {
    //     ZW4ckl1RHWh4Po4ZAAAF: 3,
    //     Z4eRUbeo1lKcA1tmAAAH: 59,
    //     l5rY4tLIs9JmWwYBAAAJ: 59
    //   }
    //   ONLINE USERS IDS ARRAY :>>  [ 3, 59 ]

    // ⬇⬇⬇⬇ CHECK IF SOME ONLINERS IS A FRIEND ⬇⬇⬇⬇

    // db.onlineFriendsInfo(onlineUserIDsArray).then(({ rows }) => {
    //     // console.log("INFO FOR FRIENDS ONLINE:>> ", { rows });
    //     io.emit("onlineFriends", rows);
    // });

    // ⬇⬇⬇⬇ PRIVATE MESSAGES ⬇⬇⬇⬇

    // let variableWithID;
    // socket.on("private chat opened", ({ otherUserID, userID }) => {
    //     console.log("otherUserID :>> ", otherUserID);
    //     db.lastThenPrivateMessages(userID, otherUserID).then(({ rows }) => {
    //         console.log("LAST THEN MESSAGES :>> ", rows);
    //         io.emit("most recent pvt messages", rows);
    //     });
    // });

    // console.log("variableWithID :>> ", variableWithID);

    // socket.on("newPvtMessage", ({ otherUserID, message }) => {
    //     db.insertPrivateMessage(userID, otherUserID, message).then(
    //         ({ rows }) => {
    //             // console.log("id :>> ", rows[0].id);
    //             let idForLastMessage = rows[0].id;
    //             db.lastPrivateMessage(idForLastMessage).then(({ rows }) => {
    //                 // console.log("rows :>> ", rows);
    //                 io.emit("addPvtChatMsg", rows[0]);
    //             });
    //         }
    //     );
    // });

    // ⬇⬇⬇⬇ MESSAGES ⬇⬇⬇⬇
    // db.lastThenMessages().then(({ rows }) => {
    //     // console.log("LAST THEN MESSAGES :>> ", rows);
    //     io.emit("mostRecentMsgs", rows);
    // });

    // socket.on("newMessage", (newMsg) => {
    //     db.insertMessage(userID, newMsg).then(({ rows }) => {
    //         // console.log("id :>> ", rows[0].id);
    //         let idForLastMessage = rows[0].id;
    //         db.lastMessage(idForLastMessage).then(({ rows }) => {
    //             // console.log("rows :>> ", rows);
    //             io.emit("v", rows[0]);
    //         });
    //     });
    // });
});

// OLD NOTE

// io.on("connection", (socket) => {
//     // console.log(`User with ID ${socket.id} just connect`);
//     const userID = socket.request.session.userID;
//     // console.log(userID);
//     console.log(
//         `User with userID ${userID} and socket ID ${socket.id} is just connect`
//     );

//     if (!userID) {
//         return socket.disconnect(true);
//     }

//     // db.getLstaTenMsg().then((result) => {
//     //     console.log("result.rows :>> ", result.rows);
//     //     io.socket.emit("chatMessages", result.rows);
//     // });

//     socket.on("newChatMessage", (newMsg) => {
//         console.log("message from chat.js component :>> ", newMsg);
//     });
//     // socket.emit("greeting", {
//     //     message: "Hello welcome",
//     // });

//     // socket.on("disconnect", () => {
//     //     console.log(`User with ID ${socket.id} just disconnected`);
//     // });

//     // socket.on("thanks", (data) => {
//     //     console.log("data :>> ", data);
//     // });
// });
