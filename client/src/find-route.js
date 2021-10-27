import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function FindRoute() {
    const [filter, setFilter] = useState("");
    const routesData = useSelector((state) => state.routes);

    const isActive = (value) => {
        if (value == filter) {
            return "active";
        } else return "inactive";
    };

    const handleFilter = (e) => {
        e.preventDefault();
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
                        <h4>LOCATION: </h4>

                        <button
                            className={isActive("city")}
                            name="city"
                            onClick={(e) => handleFilter(e)}
                        >
                            City
                        </button>
                        <button
                            className={isActive("lake")}
                            name="lake"
                            onClick={(e) => handleFilter(e)}
                        >
                            Lake
                        </button>
                        <button
                            className={isActive("forest")}
                            name="forest"
                            onClick={(e) => handleFilter(e)}
                        >
                            Forest
                        </button>
                    </div>
                    <div className="grade-buttons">
                        <h4>GRADE: </h4>
                        <button
                            name="easy"
                            className={isActive("easy")}
                            onClick={(e) => handleFilter(e)}
                        >
                            Easy
                        </button>
                        <button
                            className={isActive("intermediate")}
                            name="intermediate"
                            onClick={(e) => handleFilter(e)}
                        >
                            Intermediate
                        </button>
                    </div>
                    <div className="path-buttons">
                        <h4>PATH: </h4>
                        <button
                            name="cycle path"
                            className={isActive("cycle path")}
                            onClick={(e) => handleFilter(e)}
                        >
                            Cycle Path
                        </button>
                        <button
                            className={isActive("off road")}
                            name="off road"
                            onClick={(e) => handleFilter(e)}
                        >
                            Off-Road
                        </button>
                    </div>
                </div>
                <div className="result-input">
                    {routesData &&
                        routesData.map((route, i) => (
                            <div className={route.location} key={i}>
                                <Link to={`route/${route.id}`}>
                                    <div className="pic-link">
                                        <img
                                            id="immagine"
                                            src={`/img/route-pic/${route.id}_${route.location}.png`}
                                        ></img>
                                    </div>
                                </Link>
                                <div className="route-information">
                                    <h2>{route.name}</h2>
                                    <h3>
                                        {route.location} - ({route.distance}KM)
                                    </h3>

                                    <h6 className={route.grade}>
                                        {route.grade}, {route.path},{" "}
                                    </h6>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
