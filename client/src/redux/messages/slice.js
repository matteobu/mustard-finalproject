/// REDUCER -----------------------------------------

export default function messageReducer(state = null, action) {
    if (action.type == "messages/messagesFromDB") {
        state = action.payload.msgs;
    } else if (action.type == "messages/chatMessagesReceived") {
        return [action.payload, ...state];
    }
    return state;
}

// ACTION CREATOR -------------------------------------
export function messagesFromDB(msgs) {
    // console.log("messages from DB :>> ", msgs);
    return {
        type: "messages/messagesFromDB",
        payload: { msgs },
    };
}
export function chatMessagesReceived(msgs) {
    // console.log("messages from CHAT :>> ", msgs);
    return {
        type: "messages/chatMessagesReceived",
        payload: msgs,
    };
}
