import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector } from "react-redux";
import geoJson from "./json/berlin-caffe.json";
import trackGeoJson from "./json/tracks.json";

mapboxgl.accessToken =
    "pk.eyJ1IjoibWF0dGVvLW11c3RhcmQiLCJhIjoiY2t2M3Y0MnprMHFjYjJ2czNra3J0eTBxNSJ9.vVHSarJklOTnDN6Qi6IVmw";
// var MapboxDirections = require("@mapbox/mapbox-gl-directions");
// const togeojson = require("togeojson");

const OpenMap = (props) => {
    const mapContainerRef = useRef(null);
    // console.log(`propss`, props);
    // const [startingLngLat, setstartingLngLat] = useState("");
    const [lng, setLng] = useState(13.404954);
    const [lat, setLat] = useState(52.520008);
    const [zoom, setZoom] = useState(9);
    const [usersCoordinate, setCrd] = useState();
    // const [location, setLocation] = useState(trackGeoJson.features[1 - 1]);

    const infoRoute = useSelector((state) => state.routes);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/matteo-mustard/ckv11nuwk2ciq14mt36dxist7",
            center: [lng, lat],
            zoom: zoom,
        });
        const bounds = [
            [12.921005658682487, 52.309743833425124],
            [13.74824315032486, 52.68945575885245],
        ];
        map.setMaxBounds(bounds);
        const start = props.start;

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true,
            })
        );

        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        map.on("move", () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // Clean up on unmount
        map.on("load", () => {
            async function getRoute() {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                };

                var endCoordinates;
                function success(pos) {
                    var crd = pos.coords;
                    // console.log(`crd`, crd);
                    endCoordinates = [crd.latitude, crd.longitude];
                    setCrd(endCoordinates);
                }

                function error(err) {
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                }
                navigator.geolocation.getCurrentPosition(
                    success,
                    error,
                    options
                );

                console.log(`endCoordinates`, endCoordinates);
                console.log(`endCoordinates`, usersCoordinate);
                // make a directions request using cycling profile
                // an arbitrary start will always be the same
                // only the end or destination will change
                const query = await fetch(
                    `https://api.mapbox.com/directions/v5/mapbox/cycling/13.386303426788103,52.453063695365934;${start[0]},${start[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                    { method: "GET" }
                );
                const json = await query.json();
                const data = json.routes[0];
                const route = data.geometry.coordinates;
                const geojson = {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: route,
                    },
                };
                // if the route already exists on the map, we'll reset it using setData
                // if (map.getSource("route")) {
                //     map.getSource("route").setData(geojson);
                // }
                // // otherwise, we'll make a new request
                // else {

                map.addLayer({
                    id: "route",
                    type: "line",
                    source: {
                        type: "geojson",
                        data: geojson,
                    },
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": "#f30",
                        "line-width": 3,
                        "line-opacity": 1,
                    },
                });

                // const handleButton = (e) => {
                //     map.addLayer({
                //         id: "route",
                //         type: "line",
                //         source: {
                //             type: "geojson",
                //             data: location,
                //         },
                //         layout: {
                //             "line-join": "round",
                //             "line-cap": "round",
                //         },
                //         paint: {
                //             "line-color": "#3887be",
                //             "line-width": 5,
                //             "line-opacity": 1,
                //         },
                //     });
                // };
            }

            getRoute(start);

            // Add starting point to the map

            map.addLayer({
                id: "point",
                type: "circle",
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                properties: {},
                                geometry: {
                                    type: "Point",
                                    coordinates: start,
                                },
                            },
                        ],
                    },
                },
                paint: {
                    "circle-radius": 10,
                    "circle-color": "#f30",
                },
            });
            // this is where the code from the next step will go
        });

        // console.log(`crd before click`, usersCoordinate);

        // map.on("click", (event) => {
        //     const coords = Object.keys(event.lngLat).map(
        //         (key) => event.lngLat[key]
        //     );

        //     console.log(`coords`, coords);
        //     const end = {
        //         type: "FeatureCollection",
        //         features: [
        //             {
        //                 type: "Feature",
        //                 properties: {},
        //                 geometry: {
        //                     type: "Point",
        //                     coordinates: coords,
        //                 },
        //             },
        //         ],
        //     };
        //     if (map.getLayer("end")) {
        //         map.getSource("end").setData(end);
        //     } else {
        //         map.addLayer({
        //             id: "end",
        //             type: "circle",
        //             source: {
        //                 type: "geojson",
        //                 data: {
        //                     type: "FeatureCollection",
        //                     features: [
        //                         {
        //                             type: "Feature",
        //                             properties: {},
        //                             geometry: {
        //                                 type: "Point",
        //                                 coordinates: coords,
        //                             },
        //                         },
        //                     ],
        //                 },
        //             },
        //             paint: {
        //                 "circle-radius": 10,
        //                 "circle-color": "#f30",
        //             },
        //         });
        //     }
        //     getRoute(coords);
        // });

        return () => console.log(); // map.remove();
    }, []);

    return (
        <div className="main-map-container">
            <div className="map-container" ref={mapContainerRef} />
            {/* <button onClick={handleButton}>CLICK</button> */}
        </div>
    );
};

export default OpenMap;
