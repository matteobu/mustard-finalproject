import { io } from "socket.io-client";
import {
    routesReceived,
    specificRoutesReceived,
} from "./redux/routes/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
    // socket.on(
    //     "mostRecentMsgs",
    //     async (msgs) => await store.dispatch(messagesFromDB(msgs))
    // );

    socket.on("all routes from DB", async (data) => {
        await store.dispatch(routesReceived(data));
    });
    socket.on("specific routes from DB", async (data) => {
        await store.dispatch(specificRoutesReceived(data));
    });
    // socket.on("addChatMsg", async (msg) => {
    //     await store.dispatch(chatMessagesReceived(msg));
    // });

    // // ONLINE USERS AND FRIENDS
    // socket.on("onlineUsers", async (value) => {
    //     // console.log("onlineUsers ON SOCKET:>> ", value);
    //     await store.dispatch(onlineUsers({ value }));
    // });
    // socket.on("onlineFriends", async (value) => {
    //     // console.log("onlineFriends ON SOCKET:>> ", value);
    //     await store.dispatch(onlineFriends({ value }));
    // });

    // /// PRIVATE CHAT
    // socket.on(
    //     "most recent pvt messages",
    //     async (msgs) => await store.dispatch(privateMessagesFromDB(msgs))
    // );
    // socket.on("addPvtChatMsg", async (msg) => {
    //     await store.dispatch(privateChatMessagesReceived(msg));
    // });
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
