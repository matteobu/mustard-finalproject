/// REDUCER -----------------------------------------

export default function onlineReducer(state = null, action) {
    if (action.type == "users/onlineUsers") {
        state = action.payload.value;
    }
    return state;
}

// ACTION CREATOR -------------------------------------
export function onlineUsers({ value }) {
    // console.log("USERS THAT ARE ONLINE NOW ON SLICE:>> ", value);
    return {
        type: "users/onlineUsers",
        payload: { value },
    };
}
