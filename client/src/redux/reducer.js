import { combineReducers } from "redux";
import routeReducer from "./routes/slice.js";
import userReducer from "./users/slice.js";
import favoriteReducer from "./favorite/slice.js";
//
const rootReducer = combineReducers({
    routes: routeReducer,
    user: userReducer,
    fav: favoriteReducer,
});

export default rootReducer;
