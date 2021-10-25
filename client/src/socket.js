import { io } from "socket.io-client";
import {
    routesReceived,
    specificRoutesReceived,
    routeProfileInfo,
} from "./redux/routes/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("all routes from DB", async (data) => {
        await store.dispatch(routesReceived(data));
    });
    socket.on("specific routes from DB", async (data) => {
        await store.dispatch(specificRoutesReceived(data));
    });
    socket.on("route profile info", async (data) => {
        await store.dispatch(routeProfileInfo(data));
    });
};
