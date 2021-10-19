/// REDUCER -----------------------------------------

export default function messageReducer(state = null, action) {
    console.log("state :>> ", state);

    if (action.type == "messages/messagesFromDB") {
        console.log("object received from ACTION FROM DB :>> ", action.payload);
        // let newState =
        state = action.payload.msgs;
    }
    console.log("state :>> ", state);
    //  else if (action.type == "messages/chatMessagesReceived") {
    //     console.log("objectchatMessagesReceived :>> ", action.payload);
    //     state = {
    //         ...state,
    //         message: action.payload.msgs,
    //     };
    //     console.log("state AFTER SPREADING STATE:>> ", state);
    // }
    return state;
}

// ACTION CREATOR -------------------------------------
export function messagesFromDB(msgs) {
    console.log("messages from DB :>> ", msgs);
    return {
        type: "messages/messagesFromDB",
        payload: { msgs },
    };
}
// export function chatMessagesReceived(msgs) {
//     console.log("messages from CHAT :>> ", msgs);
//     return {
//         type: "messages/chatMessagesReceived",
//         payload: msgs,
//     };
// }
