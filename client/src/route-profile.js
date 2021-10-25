import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// import FriendshipButton from "./friendshipBtn";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Map from "./routes";
import trackGeoJson from "./json/tracks.json";

// import PvtChat from "./pvt-chat";

export default function RouteProfile(props) {
    const [lng, setLng] = useState();
    const [lat, setLat] = useState();
    // console.log(`props`, props);
    const routesProfileData = useSelector((state) => state.routes);
    const { routeID } = useParams();
    // console.log(`routesProfileData`, routesProfileData);

    useEffect(() => {
        let first = [];
        let second = [];
        let maxLng;
        let maxLat;
        let minLng;
        let minLat;
        let coordArray =
            trackGeoJson.features[routeID - 1].geometry.coordinates[0];

        coordArray.length &&
            coordArray?.map((x) => {
                first.push(x[0]);
                second.push(x[1]);
            });

        if (coordArray.length) {
            maxLng = Math.max(...first);
            maxLat = Math.max(...second);
            minLng = Math.min(...first);
            minLat = Math.min(...second);
            console.log(minLat);
            console.log(maxLat);

            console.log(minLng);
            console.log(maxLng);
        }

        let lngToPush = [(minLng + maxLng) / 2];
        let latToPush = [(minLat + maxLat) / 2];

        console.log(`latToPush`, latToPush[0]);
        console.log(`lngToPush `, lngToPush[0]);
        console.log(`lat`, lat);
        console.log(`lng`, lng);

        setLng(lngToPush);
        setLat(latToPush);

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
                            <button>
                                <a
                                    href={`gpx/${info.location}_${info.id}.gpx`}
                                    download
                                >
                                    GPX FILE
                                </a>
                            </button>
                        </div>
                        <div className="map-container-right">
                            <Map
                                routeID={routeID}
                                longitude={lng}
                                latitude={lat}
                            />
                        </div>
                    </div>
                ))}
        </>
    );
}
