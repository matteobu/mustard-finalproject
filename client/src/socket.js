import { io } from "socket.io-client";
import {
    routesReceived,
    specificRoutesReceived,
    routeProfileInfo,
    infoReadyForOpenMap,
} from "./redux/routes/slice.js";
import { userInfoReceived } from "./redux/users/slice.js";
import { routeFavoriteRoute, routeFavAdded } from "./redux/favorite/slice.js";
import { routeLastTenComments, addComment } from "./redux/comments/slice.js";

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

    socket.on("insert route on fav", async (data) => {
        await store.dispatch(routeFavAdded(data));
    });
    socket.on("user's fav", async (data) => {
        await store.dispatch(routeFavoriteRoute(data));
    });
    socket.on("last then comments on route", async (data) => {
        console.log(`data`, data);
        await store.dispatch(routeLastTenComments(data));
    });
    socket.on("addComment", async (data) => {
        console.log(`data`, data);
        await store.dispatch(addComment(data));
    });
    socket.on("info ready for open map", async (info) => {
        console.log(`data`, info);
        await store.dispatch(infoReadyForOpenMap(info));
    });
};
