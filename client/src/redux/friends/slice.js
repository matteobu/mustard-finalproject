/// REDUCER -----------------------------------------

export default function friendsReducer(state = null, action) {
    if (action.type == "users/onlineFriends") {
        state = action.payload.value;
    }
    return state;
}

// ACTION CREATOR -------------------------------------

export function onlineFriends({ value }) {
    // console.log("USERS THAT ARE ONLINE NOW ON SLICE:>> ", value);
    return {
        type: "users/onlineFriends",
        payload: { value },
    };
}
