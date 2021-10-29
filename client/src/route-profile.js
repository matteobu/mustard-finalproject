import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import FriendshipButton from "./friendshipBtn";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Map from "./routes";
import trackGeoJson from "./json/tracks.json";
import Comment from "./comment";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

// console.log(`trackGeoJson`, trackGeoJson);

// import PvtChat from "./pvt-chat";

export default function RouteProfile(props) {
    // console.log(`props`, props);
    const [lng, setLng] = useState();
    const [lat, setLat] = useState();
    const { routeID } = useParams();

    const routesProfileData = useSelector((state) => state.routes);
    const favoriteRoute = useSelector(
        (state) =>
            state.fav && state.fav.find((fav) => fav.recipient_id == routeID)
    ); // BE AWARE WHEN REFACT !!

    // console.log(`OUTSIDE USE EFFECT `, favoriteRoute);

    const favoriteRouteButton = (e) => {
        if (e.target.name == "add-favorite") {
            // console.log("ADD TO  favorite");
            socket.emit("route added to fav", routeID);
        } else if (e.target.name == "remove-favorite") {
            // console.log("remove favorite");
            socket.emit("remove from fav", routeID);
        }
    };
    // const usersOnPrivateChat = {
    //             routeID: routeID,
    //         };
    // const handleButton = () => {
    //     // IF ELSE STATEMENT
    //     if (privateChat) {
    //         setPrivateChat(false);
    //     } else setPrivateChat(true);
    //     const usersOnPrivateChat = {
    //         routeID: routeID,
    //     };
    //     socket.emit("private chat opened", usersOnPrivateChat);
    // };

    // useEffect(() => {
    //     console.log(`INSIDE SECOND USE EFFECT `, favoriteRoute);
    // }, [favoriteRoute]);

    useEffect(() => {
        const start = [
            trackGeoJson.features[routeID - 1].geometry.coordinates[0][0][0],
            trackGeoJson.features[routeID - 1].geometry.coordinates[0][0][1],
            { lngToPush },
            { latToPush },
        ];
        // console.log(`start on route profile`, start);
        props.coordinates(start);
        socket.emit("comment opened", routeID);

        socket.emit("favorite route for my User");
        // console.log(`INSIDE USE EFFECT `, favoriteRoute);
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
        // console.log(
        //     `longitude coordinate`,
        //     trackGeoJson.features[routeID - 1].geometry.coordinates[0][0][1]
        // );

        if (coordArray.length) {
            maxLng = Math.max(...first);
            maxLat = Math.max(...second);
            minLng = Math.min(...first);
            minLat = Math.min(...second);
        }

        let lngToPush = [(minLng + maxLng) / 2];
        let latToPush = [(minLat + maxLat) / 2];

        setLng(lngToPush);
        setLat(latToPush);

        // socket.emit("info for open map", start);

        let abort = false;
        if (!abort) {
            socket.emit("route-profile", routeID);
        }

        return () => {
            abort = true;
        };
    }, []);

    return (
        <>
            {routesProfileData &&
                routesProfileData.map((info, i) => (
                    <div className="route-profile-container" key={i}>
                        <div className="route-right-container">
                            <h3> {info.name}</h3>
                            <h5 className={info.grade}>
                                {info.grade}, {info.path}, {info.location},{" "}
                                {info.distance}Km
                                {!favoriteRoute && (
                                    <button
                                        key={i}
                                        name="add-favorite"
                                        className={info.grade + "-favorite"}
                                        onClick={(e) => favoriteRouteButton(e)}
                                    >
                                        add fav ♥️
                                    </button>
                                )}
                                {favoriteRoute && (
                                    <button
                                        key={i}
                                        className="remove-favorite"
                                        name="remove-favorite"
                                        onClick={(e) => favoriteRouteButton(e)}
                                    >
                                        remove fav
                                    </button>
                                )}
                            </h5>
                            <h5>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Pellentesque at molestie diam.
                                Quisque vestibulum ut lorem condimentum
                                vestibulum. Integer vulputate blandit odio sed
                                sodales. Nam rhoncus quis nulla blandit posuere.
                                Praesent eu eros ornare, sagittis massa ut,
                                ullamcorper lacus. Suspendisse nec mattis sem,
                                ac mollis tortor. Praesent ut enim massa. Etiam
                                a laoreet nisl, vitae sagittis nisl. Etiam vel
                                augue nec felis tempus posuere eget vel ex.
                                <br></br>
                                Proin sed accumsan ligula. Etiam ut imperdiet
                                justo. Nulla egestas accumsan libero, quis
                                consequat lacus placerat sed. In pharetra, neque
                                quis sodales fermentum, risus leo pulvinar nunc,
                                et tristique neque justo non arcu. Donec lacus
                                urna, laoreet eget massa sit amet, lacinia
                                pellentesque velit. Aenean feugiat lacus aliquet
                                gravida vehicula. Maecenas pulvinar ac est
                                tempus fermentum. Mauris imperdiet, libero at
                                varius sodales, justo ligula dictum velit,
                                tempus pulvinar ipsum risus id est. Pellentesque
                                metus ex, auctor nec odio vitae, rutrum laoreet
                                leo. Praesent id maximus lectus. Donec et congue
                                dui. Aenean in tellus quam.
                            </h5>
                            <div className="profile-route-buttons">
                                <button className="profileBtn">
                                    <Link to="/open-map-test">GET THERE!</Link>
                                </button>
                                {/* <button className="profileBtn">
                                    <Link to="/open-map">STARTING POINT</Link>
                                </button> */}
                                <button className="profileBtn">
                                    <a
                                        href={`/gpx/${info.id}_${info.location}.gpx`}
                                        download
                                    >
                                        GPX FILE
                                    </a>
                                </button>
                            </div>
                            <Comment routeID={routeID} />
                        </div>
                        <div className="map-container-right">
                            {lng && lat && (
                                <Map
                                    routeID={routeID}
                                    longitude={lng}
                                    latitude={lat}
                                />
                            )}
                        </div>
                    </div>
                ))}
        </>
    );
}
