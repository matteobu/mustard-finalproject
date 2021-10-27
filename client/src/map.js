import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import geoJson from "./json/berlin-caffe.json";
// import trackGeoJson from "./json/tracks.json";

mapboxgl.accessToken =
    "pk.eyJ1IjoibWF0dGVvLW11c3RhcmQiLCJhIjoiY2t2M3Y0MnprMHFjYjJ2czNra3J0eTBxNSJ9.vVHSarJklOTnDN6Qi6IVmw";

const Map = () => {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(13.404954);
    const [lat, setLat] = useState(52.520008);
    const [zoom, setZoom] = useState(9);

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
            style: "mapbox://styles/matteo-mustard/ckv11nuwk2ciq14mt36dxist7",
            center: [lng, lat],
            zoom: zoom,
        });
        const bounds = [
            [12.921005658682487, 52.309743833425124],
            [13.74824315032486, 52.68945575885245],
        ];
        map.setMaxBounds(bounds);

        geoJson.features.map((feature) =>
            new mapboxgl.Marker()
                .setLngLat(feature.geometry.coordinates)
                .addTo(map)
                .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
                .getPitchAlignment()
        );

        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        return () => console.log(); // map.remove();
    }, []);
    return (
        <div>
            <div className="map-container" ref={mapContainerRef} />
            <button onClick={handleButton}>CLICK</button>
        </div>
    );
};

export default Map;
