import { combineReducers } from "redux";
import routeReducer from "./routes/slice.js";
//
const rootReducer = combineReducers({
    routes: routeReducer,
});

export default rootReducer;
