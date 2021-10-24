import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function FindRoute(props) {
    // console.log("PROPS IN FIND BIKERZ", props);
    const [route, setRoute] = useState([]);
    const [location, setLocation] = useState("");
    // const [countries, setCountries] = useState([]);
    const routesData = useSelector((state) => state.routes);
    console.log(`routesData`, routesData);

    const handleButton = (e) => {
        console.log(`e.target.name`, e.target.name);
        setLocation(e.target.name);
    };

    useEffect(() => {
        if (!location) {
            socket.emit("allRoutes");
        } else socket.emit("specific route", location);

        console.log(`location on USE EFFECT`, location);

        return () => {
            console.log();
        };
    }, [location]);

    return (
        <>
            <div className="find-bikerz-container">
                <button name="city" onClick={(e) => handleButton(e)}>
                    CITY
                </button>
                <div className="result-input">
                    {routesData &&
                        routesData.map((route, i) => (
                            <div className="user-result-container" key={i}>
                                <Link to={`bikerz/${route.id}`}>
                                    <img
                                        className="result-icon"
                                        src="./../public/img/route-pic/city_01.png"
                                    ></img>
                                    <h3>{route.name}</h3>
                                    <h3>{route.location}</h3>
                                    <h3>{route.path}</h3>
                                    <h3>{route.grade}</h3>
                                    <h3>{route.distance}</h3>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
