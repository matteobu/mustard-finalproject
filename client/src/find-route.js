import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function FindRoute() {
    const [filter, setFilter] = useState("");
    // const [activeFilter, setActiveFilter] = useState("");
    // const [buttonClass, setButtonClass] = useState("inactive");
    const routesData = useSelector((state) => state.routes);

    const isActive = (value) => {
        if (value == filter) {
            return "active";
        } else return "inactive";
    };

    const handleFilter = (e) => {
        e.preventDefault();
        console.log(`e.target.name`, e.target.name);
        console.log(`e`, e);

        setFilter(e.target.name);
    };

    useEffect(() => {
        if (!filter) {
            socket.emit("allRoutes");
        } else socket.emit("specific route", filter);

        return () => {
            console.log();
        };
    }, [filter]);

    return (
        <>
            <div className="find-routes-container">
                <div className="search-option-container">
                    <div className="INTRO-filter-container">
                        <h3> DO YOU FANCY A RIDE IN BERLIN?</h3>
                        <h3> CHOOSE YOUR FAV LOCATION OR GRADE!</h3>
                    </div>

                    <div className="location-buttons">
                        <button
                            className={isActive("city")}
                            name="city"
                            onClick={(e) => handleFilter(e)}
                        >
                            CITY
                        </button>
                        <button
                            className={isActive("lake")}
                            name="lake"
                            onClick={(e) => handleFilter(e)}
                        >
                            LAKE
                        </button>
                        <button
                            className={isActive("forest")}
                            name="forest"
                            onClick={(e) => handleFilter(e)}
                        >
                            FOREST
                        </button>
                    </div>

                    {/* <div className="slidecontainer">
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value="50"
                            id="myRange"
                        ></input>
                    </div> */}
                    <div className="grade-buttons">
                        <button
                            name="easy"
                            className={isActive("easy")}
                            onClick={(e) => handleFilter(e)}
                        >
                            EASY
                        </button>
                        <button
                            className={isActive("intermediate")}
                            name="intermediate"
                            onClick={(e) => handleFilter(e)}
                        >
                            INTERMEDIATE
                        </button>
                    </div>
                </div>
                <div className="result-input">
                    {routesData &&
                        routesData.map((route, i) => (
                            <div className="routes-result-container" key={i}>
                                <Link to={`route/${route.id}`}>
                                    <div className="pic-link">
                                        <img
                                            src={`/img/route-pic/${route.id}_${route.location}.png`}
                                        ></img>
                                    </div>
                                </Link>
                                <div className="route-information">
                                    <h2>{route.name}</h2>
                                    <h3>Location: {route.location}</h3>
                                    <h3>Path:</h3> {route.path}
                                    <h6 className={route.grade}>
                                        {route.grade}, {route.path}
                                    </h6>
                                    <h3>Distance: {route.distance}</h3>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
