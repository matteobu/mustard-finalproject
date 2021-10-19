import { io } from "socket.io-client";

import {
    chatMessagesReceived,
    messagesFromDB,
} from "./redux/messages/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("mostRecentMsgs", (msgs) =>
            store.dispatch(messagesFromDB(msgs))
        );

        socket.on("addChatMsg", (msg) => {
            store.dispatch(chatMessagesReceived(msg));
        });
    }
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
