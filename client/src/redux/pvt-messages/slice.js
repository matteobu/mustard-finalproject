/// REDUCER -----------------------------------------

export default function pvtMessageReducer(state = null, action) {
    if (action.type == "messages/privateMessagesFromDB") {
        state = action.payload.msgs;
    } else if (action.type == "messages/privateChatMessagesReceived") {
        return [action.payload, ...state];
    }
    return state;
}

// ACTION CREATOR -------------------------------------
export function privateMessagesFromDB(msgs) {
    console.log("PRIVATE MESSAGES ON SLICE  :>> ", msgs);
    return {
        type: "messages/privateMessagesFromDB",
        payload: { msgs },
    };
}
export function privateChatMessagesReceived(msgs) {
    console.log("messages from CHAT :>> ", msgs);
    return {
        type: "messages/privateChatMessagesReceived",
        payload: msgs,
    };
}
