import { combineReducers } from "redux";
import usersReducer from "./users/slice.js";

const rootReducer = combineReducers({
    users: usersReducer,
});

export default rootReducer;