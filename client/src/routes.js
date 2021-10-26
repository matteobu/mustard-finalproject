import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
// import "./Map.css";
// import Marker from "react-map-gl";
import geoJson from "./json/berlin-caffe.json";
import trackGeoJson from "./json/tracks.json";
const secrets = require("./../../secrets.json");

mapboxgl.accessToken = secrets.MAPBOX_TOKEN;

const Map = ({ routeID, latitude, longitude }) => {
    const mapContainerRef = useRef(null);

    // const [lng, setLng] = useState(13.404954);
    // const [lat, setLat] = useState(52.520008);
    // const [lng, setLng] = useState(longitude);
    // const [lat, setLat] = useState(latitude);
    const [zoom, setZoom] = useState(10);
    // const [locationType, setLocationType] = useState(routeID - 1);
    const [location, setLocation] = useState(
        trackGeoJson.features[routeID - 1]
    );
    // const handleButton = (e) => {
    //     new mapboxgl.Marker()
    //         .setLngLat(e.lngLat)
    //         .addTo(Map)
    //         .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
    //         .getPitchAlignment();
    //     return (location = trackGeoJson.features);
    //     setLocationType(0);
    // };

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // style: "mapbox://styles/mapbox/streets-v11",
            style: "mapbox://styles/matteo-mustard/ckv11nuwk2ciq14mt36dxist7",
            // center: [13.403283921932651, 52.5179027649254],
            center: [longitude, latitude],

            zoom: zoom,
        });

        const bounds = [
            [10.82, 50.31],
            [14.85, 54.69],
        ];
        map.setMaxBounds(bounds);

        map.on("load", function () {
            map.resize();

            map.addLayer({
                id: "route",
                type: "line",
                source: {
                    type: "geojson",
                    data: location,
                },
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#3887be",
                    "line-width": 5,
                    "line-opacity": 1,
                },
            });
        });

        return () => console.log(); // map.remove();
    }, []);

    return (
        <div className="map-container" ref={mapContainerRef}>
            {/* <div className="sidebarStyle">
                <div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div> */}
            {/* <div className="left-side-map-container">
                <button name="lake" onClick={handleButton}>
                    CLICK
                </button>
            </div> */}
        </div>
    );
};

export default Map;
