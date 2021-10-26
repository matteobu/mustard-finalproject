/// REDUCER -----------------------------------------

export default function userReducer(state = null, action) {
    if (action.type == "user/userInfoReceived") {
        state = action.payload.user;
    }

    return state;
}

// ACTION CREATOR -------------------------------------
export function userInfoReceived(user) {
    // console.log("user on slice:>> ", user);
    return {
        type: "user/userInfoReceived",
        payload: { user },
    };
}
