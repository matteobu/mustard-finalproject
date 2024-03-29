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

    const infoRoute = useSelector((state) => state.routes);

    // console.log(`infoRoute`, infoRouclte);

    // const handleButton = (e) => {
    //     // new mapboxgl.Marker()
    //     //     .setLngLat(e.lngLat)
    //     //     .addTo(Map)
    //     //     .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
    //     //     .getPitchAlignment();
    // };

    useEffect(() => {
        console.log(`usersCoordinate`, usersCoordinate);
        return () => {};
    }, [usersCoordinate]);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // style: "mapbox://styles/mapbox/streets-v11",
            style: "mapbox://styles/matteo-mustard/ckv11nuwk2ciq14mt36dxist7",
            center: [lng, lat],
            zoom: zoom,
        });
        const bounds = [
            [12.921005658682487, 52.309743833425124],
            [13.74824315032486, 52.68945575885245],
        ];
        map.setMaxBounds(bounds);
        // console.log(`props.start on open map`, props.start);
        const start = props.start;

        // const start = [startingLngLat];
        // map.on("click", function () {
        //     map.addLayer({
        //         id: "route",
        //         type: "line",
        //         source: {
        //             type: "geojson",
        //             data: trackGeoJson,
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
        // });
        // Create default markers

        // geoJson.features.map((feature) =>
        //     new mapboxgl.Marker()
        //         .setLngLat(feature.geometry.coordinates)
        //         .addTo(map)
        //         .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
        //         .getPitchAlignment()
        // );

        // Add navigation control (the +/- zoom buttons)
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

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        function success(pos) {
            var crd = pos.coords;
            var crdToSet = [crd.latitude, crd.longitude];
            setCrd(crdToSet);
            console.log(`crdToSet`, crdToSet);
            console.log(`crd before click`, usersCoordinate);

            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        // map.addControl(
        //     new MapboxDirections({
        //         accessToken: mapboxgl.accessToken,
        //     }),
        //     "top-left"
        // );
        map.on("move", () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // Clean up on unmount

        async function getRoute(usersCoordinate) {
            // make a directions request using cycling profile
            // an arbitrary start will always be the same
            // only the end or destination will change
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${usersCoordinate[0]},${usersCoordinate[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
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
            if (map.getSource("route")) {
                map.getSource("route").setData(geojson);
            }
            // otherwise, we'll make a new request
            else {
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
                        "line-color": "#3887be",
                        "line-width": 2,
                        "line-opacity": 1,
                    },
                });
            }
            // add turn instructions here at the end
        }

        // map.on("click", (e) => {
        //     console.log(`e`, e);
        // });

        map.on("load", () => {
            // make an initial directions request that
            // starts and ends at the same location
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
                    "circle-color": "#3887be",
                },
            });
            // this is where the code from the next step will go
        });

        console.log(`crd before click`, usersCoordinate);

        map.on("click", (event) => {
            const coords = Object.keys(event.lngLat).map(
                (key) => event.lngLat[key]
            );

            console.log(`coords`, coords);
            const end = {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates: coords,
                        },
                    },
                ],
            };
            if (map.getLayer("end")) {
                map.getSource("end").setData(end);
            } else {
                map.addLayer({
                    id: "end",
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
                                        coordinates: coords,
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
            }
            getRoute(coords);
        });

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
