/// REDUCER -----------------------------------------

export default function usersReducer(state = null, action) {
    if (action.type == "users/receivedUsers") {
        // console.log("STATE BEFORE", state);
        // console.log("ACTION PLAYLOAD USERS", action.payload.users);
        state = action.payload.users;
        // console.log("STATE AFTER", state);
    } else if (action.type === "users/receiveFriends") {
        // console.log("STATE on RECEIVE FRIENDS:>> ", state);
        // console.log("ACTION  ON RECEIVE FRIENDS", action);
        // console.log("ACTION PLAYLOAD ON RECEIVE FRIENDS", action.payload);
        state = state.map((users) => {
            if (users.id === action.payload.otherUserID) {
                return {
                    ...users,
                    accepted: true,
                };
            } else {
                return users;
            }
        });
    } else if (action.type === "users/cancelReletionship") {
        // console.log("cancelReletionship :>> ");
        const newState = [...state];
        const stateUpdate = newState.filter(
            (users) => users.id != action.payload
        );

        return stateUpdate;
    }
    if (action.type === "users/checkFriendRequest") {
        // console.log("ROWS on SLICE");
        // console.log(
        //     "action payload inside CHECK FRIEND REQUEST :>> ",
        //     action.payload
        // );
        return state;
    }

    return state;
}

// ACTION CREATOR -------------------------------------
export function receiveUsers(users) {
    // console.log("users :>> ", users);
    return {
        type: "users/receivedUsers",
        payload: { users },
    };
}
export function receiveFriends(otherUserID) {
    // console.log("otherUserID ACTION CREATOR:>> ", otherUserID);
    return {
        type: "users/receiveFriends",
        payload: { otherUserID },
    };
}
export function cancelReletionship(otherUserID) {
    // console.log("otherUserID :>> ", otherUserID);
    return {
        type: "users/cancelReletionship",
        payload: otherUserID,
    };
}
export function checkFriendRequest(string) {
    return {
        type: "users/checkFriendRequest",
        payload: string,
    };
}
