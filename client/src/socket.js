import { io } from "socket.io-client";
import {
    routesReceived,
    specificRoutesReceived,
    routeProfileInfo,
} from "./redux/routes/slice.js";
import { userInfoReceived } from "./redux/users/slice.js";
import { routeFavoriteRoute } from "./redux/favorite/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("all info from user", async (data) => {
        await store.dispatch(userInfoReceived(data));
    });
    socket.on("all routes from DB", async (data) => {
        await store.dispatch(routesReceived(data));
    });
    socket.on("specific routes from DB", async (data) => {
        await store.dispatch(specificRoutesReceived(data));
    });
    socket.on("route profile info", async (data) => {
        await store.dispatch(routeProfileInfo(data));
    });
    // socket.on("route fav true", async (data) => {
    //     await store.dispatch(routeFavoriteRoute(data));
    // });
    socket.on("user's fav", async (data) => {
        await store.dispatch(routeFavoriteRoute(data));
    });
};
