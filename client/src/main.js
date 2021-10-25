import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// import FriendshipButton from "./friendshipBtn";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Map from "./routes";

// import PvtChat from "./pvt-chat";

export default function RouteProfile(props) {
    console.log(`props`, props);
    const routesProfileData = useSelector((state) => state.routes);
    const { routeID } = useParams();
    // console.log(`routesProfileData`, routesProfileData);

    useEffect(() => {
        let abort = false;
        // console.log(`routeID`, routeID);
        if (!abort) {
            socket.emit("route-profile", routeID);
            // console.log(`routesProfileData`, routesProfileData);
        }
        return () => {
            // console.log("cleanup function");
            abort = true;
        };
    }, []);
    // const handleButton = () => {
    //     // IF ELSE STATEMENT
    //     if (privateChat) {
    //         setPrivateChat(false);
    //     } else setPrivateChat(true);
    // };

    return (
        <>
            <div className="route-profile-container">
                <div>THIS WILL BE THE HOME PAGE</div>
            </div>
        </>
    );
}
