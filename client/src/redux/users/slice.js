/// REDUCER -----------------------------------------

export default function usersReducer(state = null, action) {
    if (action.type == "users/receivedUsers") {
        // console.log("STATE BEFORE", state);
        // console.log("ACTION PLAYLOAD USERS", action.payload.users);
        state = action.payload.users;
        // console.log("STATE AFTER", state);
    } else if (action.type === "user/receiveFriends") {
        console.log("STATE on RECEIVE FRIENDS:>> ", state);
        console.log("ACTION  ON RECEIVE FRIENDS", action);
        console.log("ACTION PLAYLOAD ON RECEIVE FRIENDS", action.payload);
        state = state.map((user) => {
            if (user.id === action.payload.otherUserID) {
                return {
                    ...user,
                    accepted: true,
                };
            } else {
                return user;
            }
        });
    } else if (action.type === "user/cancelReletionship") {
        // console.log("STATE on USER/MADE HOT:>> ", state);
        // console.log("ACTION PLAYLOAD ID", action.playload);
        // console.log("USER NOT HOT", action.playload.id);
        // state = state.map((user) => {
        //     if (user.id === action.playload.otherUserID) {
        //         return {
        //             ...user,
        //             accepted: null,
        //         };
        //         // user.hot = true;
        //         // return user;
        //     } else {
        //         return user;
        //     }
        // });
    }

    return state;
}

// ACTION CREATOR -------------------------------------
export function receiveUsers(users) {
    console.log("users :>> ", users);
    return {
        type: "users/receivedUsers",
        payload: { users },
    };
}
export function receiveFriends(otherUserID) {
    console.log("otherUserID ACTION CREATOR:>> ", otherUserID);
    return {
        type: "user/receiveFriends",
        payload: otherUserID,
    };
}
export function cancelReletionship(otherUserID) {
    console.log("otherUserID :>> ", otherUserID);
    return {
        type: "users/cancelReletionship",
        payload: otherUserID,
    };
}
