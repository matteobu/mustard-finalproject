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
            {routesProfileData &&
                routesProfileData.map((info, i) => (
                    <div className="route-profile-container" key={i}>
                        <div className="profile-right-container">
                            <h3> {info.name}</h3>
                            <h5>
                                {" "}
                                this is HARD CODED YOU NEED TO CHANGE WITH A
                                VALUE FROM THE DBLorem Ipsum is simply dummy
                                text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry standard dummy
                                text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it
                                to make a type specimen book. It has survived
                                not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially
                                unchanged. It was popularised in the 1960s with
                                the release of Letraset sheets containing Lorem
                                Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker
                                including versions of Lorem Ipsum.{" "}
                            </h5>
                            <div>
                                <h6 className={info.grade}>
                                    {" "}
                                    {info.grade}, {info.path}
                                </h6>
                                {/* <h6 className={info.grade}> {info.path}</h6> */}
                            </div>
                            <button>DOWNLOAD GPX FILE</button>
                        </div>
                        <div className="map-container-right">
                            <Map />
                        </div>
                    </div>
                ))}
        </>
    );
}
