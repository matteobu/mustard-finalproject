import { io } from "socket.io-client";
import {
    chatMessagesReceived,
    messagesFromDB,
} from "./redux/messages/slice.js";
import {
    privateMessagesFromDB,
    privateChatMessagesReceived,
} from "./redux/pvt-messages/slice.js";
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

    // ONLINE USERS AND FRIENDS
    socket.on("onlineUsers", async (value) => {
        // console.log("onlineUsers ON SOCKET:>> ", value);
        await store.dispatch(onlineUsers({ value }));
    });
    socket.on("onlineFriends", async (value) => {
        // console.log("onlineFriends ON SOCKET:>> ", value);
        await store.dispatch(onlineFriends({ value }));
    });

    /// PRIVATE CHAT
    socket.on(
        "most recent pvt messages",
        async (msgs) => await store.dispatch(privateMessagesFromDB(msgs))
    );
    socket.on("addPvtChatMsg", async (msg) => {
        await store.dispatch(privateChatMessagesReceived(msg));
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
