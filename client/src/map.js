import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
// import "./Map.css";
// import Marker from "react-map-gl";
import geoJson from "./json/berlin-caffe.json";
import trackGeoJson from "./json/tracks.json";

// var MapboxDirections = require("@mapbox/mapbox-gl-directions");
// const togeojson = require("togeojson");

// var tj = require("togeojson"),
//     fs = require("fs"),
//     // node doesn't have xml parsing or a dom. use xmldom
//     DOMParser = require("xmldom").DOMParser;
// const DomParser = require("xmldom").DOMParser; // node doesn't have xml parsing or a dom.

// var kml = new DOMParser().parseFromString(fs.readFileSync("foo.kml", "utf8"));

// var converted = tj.kml(kml);

// var convertedWithStyles = tj.kml(kml, { styles: true });

mapboxgl.accessToken =
    "pk.eyJ1IjoibWF0dGVvLW11c3RhcmQiLCJhIjoiY2t2M3Y0MnprMHFjYjJ2czNra3J0eTBxNSJ9.vVHSarJklOTnDN6Qi6IVmw";

// const config = {};

// // Read out params passed in
// const args = process.argv.slice(2);

// args.forEach((val) => {
//     const flag = val.split("=");

//     switch (flag[0]) {
//         case "--input":
//             config.in_file = flag[1];
//             break;
//         case "--output":
//             config.out_file = flag[1];
//             break;
//         default:
//             console.log(`Unrecognized parameter passed: ${flag[0]}`);
//             break;
//     }
// });

// if (config.in_file) {
//     const fileParsedFromDom = new DomParser().parseFromString(
//         fs.readFileSync(config.in_file, "utf-8")
//     );
//     // Convert GPX to GeoJSON
//     const converted = togeojson.gpx(fileParsedFromDom);
//     if (config.out_file) {
//         fs.writeFile(config.out_file, JSON.stringify(converted), (err) => {
//             if (err) {
//                 throw new Error(err);
//             }
//             console.log("Success");
//         });
//     } else {
//         throw new Error(`Output file is not defined`);
//     }
// } else {
//     throw new Error(`Input file not defined`);
// }

const Map = () => {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(13.404954);
    const [lat, setLat] = useState(52.520008);
    const [zoom, setZoom] = useState(9);

    // Initialize map when component mounts
    const handleButton = (e) => {
        new mapboxgl.Marker()
            .setLngLat(e.lngLat)
            .addTo(Map)
            .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
            .getPitchAlignment();
    };
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

        // const start = [13.37804510437455, 52.51640136939372];
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

        geoJson.features.map((feature) =>
            new mapboxgl.Marker()
                .setLngLat(feature.geometry.coordinates)
                .addTo(map)
                .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
                .getPitchAlignment()
        );

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        // map.addControl(
        //     new MapboxDirections({
        //         accessToken: mapboxgl.accessToken,
        //     }),
        //     "top-left"
        // );
        // map.on("move", () => {
        //     setLng(map.getCenter().lng.toFixed(4));
        //     setLat(map.getCenter().lat.toFixed(4));
        //     setZoom(map.getZoom().toFixed(2));
        // });

        // Clean up on unmount

        // async function getRoute(end) {
        //     // make a directions request using cycling profile
        //     // an arbitrary start will always be the same
        //     // only the end or destination will change
        //     const query = await fetch(
        //         `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        //         { method: "GET" }
        //     );
        //     const json = await query.json();
        //     const data = json.routes[0];
        //     const route = data.geometry.coordinates;
        //     const geojson = {
        //         type: "Feature",
        //         properties: {},
        //         geometry: {
        //             type: "LineString",
        //             coordinates: route,
        //         },
        //     };
        //     // if the route already exists on the map, we'll reset it using setData
        //     if (map.getSource("route")) {
        //         map.getSource("route").setData(geojson);
        //     }
        //     // otherwise, we'll make a new request
        //     else {
        //         map.addLayer({
        //             id: "route",
        //             type: "line",
        //             source: {
        //                 type: "geojson",
        //                 data: geojson,
        //             },
        //             layout: {
        //                 "line-join": "round",
        //                 "line-cap": "round",
        //             },
        //             paint: {
        //                 "line-color": "#3887be",
        //                 "line-width": 5,
        //                 "line-opacity": 1,
        //             },
        //         });
        //     }
        //     // add turn instructions here at the end
        // }

        // map.on("click", (e) => {
        //     console.log(`e`, e);
        // });

        // map.on("load", () => {
        //     // make an initial directions request that
        //     // starts and ends at the same location
        //     getRoute(start);

        //     // Add starting point to the map
        //     map.addLayer({
        //         id: "point",
        //         type: "circle",
        //         source: {
        //             type: "geojson",
        //             data: {
        //                 type: "FeatureCollection",
        //                 features: [
        //                     {
        //                         type: "Feature",
        //                         properties: {},
        //                         geometry: {
        //                             type: "Point",
        //                             coordinates: start,
        //                         },
        //                     },
        //                 ],
        //             },
        //         },
        //         paint: {
        //             "circle-radius": 10,
        //             "circle-color": "#3887be",
        //         },
        //     });
        //     // this is where the code from the next step will go
        // });

        // map.on("click", (event) => {
        //     const coords = Object.keys(event.lngLat).map(
        //         (key) => event.lngLat[key]
        //     );
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
        //     console.log(coords);
        // });

        return () => console.log(); // map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="map-container" ref={mapContainerRef} />
            <button onClick={handleButton}>CLICK</button>
        </div>
    );
};

export default Map;

// import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import cafeData from "./json/berlin-caffe.json";
// export default function Map() {
//     var L = require("leaflet");

//     // const [searchTerm, setSearchTerm] = useState("");
//     // const { userID } = props;
//     // const dispatch = useDispatch();

//     // const cafeData = {
//     //     caffee: [
//     //         {
//     //             id: "01",
//     //             properties: {
//     //                 title: "Fernseheturm ",
//     //                 description: "Center of Berlin",
//     //             },
//     //             geometry: {
//     //                 coordinates: [52.520975033958656, 13.409246112937678],
//     //                 zone: "Center",
//     //             },
//     //         },
//     //         {
//     //             id: "02",
//     //             properties: {
//     //                 title: "Caffè Paradiso",
//     //                 description: "A cozy cafe in Potsdam",
//     //             },
//     //             geometry: {
//     //                 coordinates: [52.40374366113833, 13.062435025760038],
//     //                 zone: "South-Ovest",
//     //             },
//     //         },
//     //         {
//     //             id: "03",
//     //             properties: {
//     //                 title: "Jannys Eis",
//     //                 description: "A cozy cafe in Bernau",
//     //             },
//     //             geometry: {
//     //                 coordinates: [52.67722826364791, 13.58472138440722],
//     //                 zone: "North-East",
//     //             },
//     //         },
//     //     ],
//     // };
//     useEffect(() => {
//         console.log(`cafeData`, cafeData.caffee[0].id);
//     }, []);
//     L.Routing.control({
//         waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
//     }).addTo(mapid);
//     // *************************************************************

//     return (
//         <>
//             <MapContainer
//                 center={[52.520008, 13.404954]}
//                 zoom={9}
//                 scrollWheelZoom={true}
//             >
//                 <div id="mapid"></div>
//                 <TileLayer
//                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker
//                     // key={cafeData[0].id}
//                     position={[
//                         cafeData.caffee[0].geometry.coordinates[0],
//                         cafeData.caffee[0].geometry.coordinates[1],
//                     ]}
//                 >
//                     {" "}
//                     <Popup>
//                         {" "}
//                         <div>{cafeData.caffee[0].properties.title} </div>
//                     </Popup>
//                 </Marker>
//                 <Marker
//                     // key={cafeData[0].id}

//                     position={[
//                         cafeData.caffee[1].geometry.coordinates[0],
//                         cafeData.caffee[1].geometry.coordinates[1],
//                     ]}
//                 >
//                     <Popup>
//                         {" "}
//                         <div>{cafeData.caffee[1].properties.title} </div>
//                     </Popup>
//                 </Marker>
//                 <Marker
//                     // key={cafeData[0].id}

//                     position={[
//                         cafeData.caffee[2].geometry.coordinates[0],
//                         cafeData.caffee[2].geometry.coordinates[1],
//                     ]}
//                 >
//                     <Popup>
//                         {" "}
//                         <div>{cafeData.caffee[2].properties.title} </div>
//                     </Popup>
//                 </Marker>
//             </MapContainer>
//         </>
//     );
// }
