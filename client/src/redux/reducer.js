import { combineReducers } from "redux";
import usersReducer from "./users/slice.js";
import messageReducer from "./messages/slice.js";
import onlineReducer from "./usersOnline/slice.js";
import friendsReducer from "./friends/slice.js";

const rootReducer = combineReducers({
    users: usersReducer,
    messages: messageReducer,
    onliners: onlineReducer,
    friendsOnline: friendsReducer,
});

export default rootReducer;
