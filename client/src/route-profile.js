import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// import FriendshipButton from "./friendshipBtn";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Map from "./routes";
import trackGeoJson from "./json/tracks.json";
// console.log(`trackGeoJson`, trackGeoJson);

// import PvtChat from "./pvt-chat";

export default function RouteProfile() {
    const [lng, setLng] = useState();
    const [lat, setLat] = useState();
    const { routeID } = useParams();

    const routesProfileData = useSelector((state) => state.routes);
    const favoriteRoute = useSelector(
        (state) => state.fav && state.fav.find((fav) => fav.id == routeID)
    );

    const favoriteRouteButton = (e) => {
        if (e.target.name == "add-favorite") {
            console.log("ADD TO  favorite");
            socket.emit("route added to fav", routeID);
        } else if (e.target.name == "remove-favorite") {
            console.log("remove favorite");
            socket.emit("remove from fav", routeID);
        }
    };
    useEffect(() => {
        socket.emit("favorite route for my User");

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
        }

        let lngToPush = [(minLng + maxLng) / 2];
        let latToPush = [(minLat + maxLat) / 2];

        setLng(lngToPush);
        setLat(latToPush);

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
                                {info.grade}, {info.path}, {info.location}{" "}
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
                            <>
                                <button className="inactive">
                                    <a
                                        href={`/gpx/${info.id}_${info.location}.gpx`}
                                        download
                                    >
                                        GPX FILE
                                    </a>
                                </button>
                                {!favoriteRoute && (
                                    <button
                                        key={i}
                                        name="add-favorite"
                                        className="add-favorite"
                                        onClick={(e) => favoriteRouteButton(e)}
                                    >
                                        add FAV ♥️
                                    </button>
                                )}
                                {favoriteRoute && (
                                    <button
                                        key={i}
                                        className="remove-favorite"
                                        name="remove-favorite"
                                        onClick={(e) => favoriteRouteButton(e)}
                                    >
                                        FAV -
                                    </button>
                                )}
                            </>
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
