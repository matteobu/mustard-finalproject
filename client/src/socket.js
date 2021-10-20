import { io } from "socket.io-client";
import {
    chatMessagesReceived,
    messagesFromDB,
} from "./redux/messages/slice.js";
import { onlineUsers } from "./redux/usersOnline/slice.js";
import { onlineFriends } from "./redux/friends/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
    socket.on(
        "mostRecentMsgs",
        async (msgs) => await store.dispatch(messagesFromDB(msgs))
    );

    socket.on("addChatMsg", async (msg) => {
        await store.dispatch(chatMessagesReceived(msg));
    });

    socket.on("onlineUsers", async (value) => {
        console.log("onlineUsers ON SOCKET:>> ", value);
        await store.dispatch(onlineUsers({ value }));
    });
    socket.on("onlineFriends", async (value) => {
        console.log("onlineFriends ON SOCKET:>> ", value);
        await store.dispatch(onlineFriends({ value }));
    });
};

// import { io } from "socket.io-client";

// import {
//     chatMessagesReceived,
//     chatMessageReceived,
// } from "./redux/messages/slice.js";

// export let socket;

// export const init = (store) => {
//     if (!socket) {
//         socket = io.connect();

//         // socket.on("chatMessages", (msgs) =>
//         //     store.dispatch(chatMessagesReceived(msgs))
//         // );

//         // socket.on("newChatMessage", (msg) =>
//         //     store.dispatch(chatMessageReceived(msg))
//         // );

//     }
// };
