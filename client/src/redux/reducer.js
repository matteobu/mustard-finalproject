import { combineReducers } from "redux";
import usersReducer from "./users/slice.js";
import messageReducer from "./messages/slice.js";

const rootReducer = combineReducers({
    users: usersReducer,
    messages: messageReducer,
});

export default rootReducer;
