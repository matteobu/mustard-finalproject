import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// import FriendshipButton from "./friendshipBtn";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Map from "./routes";
import trackGeoJson from "./json/tracks.json";
console.log(`trackGeoJson`, trackGeoJson);

// import PvtChat from "./pvt-chat";

export default function RouteProfile(props) {
    const [lng, setLng] = useState();
    const [lat, setLat] = useState();
    // console.log(`props`, props);
    const routesProfileData = useSelector((state) => state.routes);
    const { routeID } = useParams();


    const favoriteRoute = (routeID) => {
        console.log("FAV BUTTON GOT CLICKED", routeID);
        socket.emit("route added to fav", routeID);
    };


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

    return (
        <>
            {routesProfileData &&
                routesProfileData.map((info, i) => (
                    <div className="route-profile-container" key={i}>
                        <div className="profile-right-container">
                            <h3> {info.name}</h3>
                            <h5 className={info.grade}>
                                {" "}
                                {info.grade}, {info.path}, {info.location},{" "}
                                {info.id}
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
                            <div className="buttons">
                                <button className="inactive">
                                    <a
                                        href={`/gpx/${info.id}_${info.location}.gpx`}
                                        download
                                    >
                                        GPX FILE
                                    </a>
                                </button>
                                <button
                                    className="fav-button"
                                    onClick={() => favoriteRoute(info.id)}
                                >
                                    FAV ♥️
                                </button>
                            </div>
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
