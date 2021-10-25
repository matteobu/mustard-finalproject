import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function FindRoute() {
    // console.log("PROPS IN FIND BIKERZ", props);
    // const [route, setRoute] = useState([]);
    const [filter, setFilter] = useState("");
    // const [countries, setCountries] = useState([]);
    const routesData = useSelector((state) => state.routes);
    console.log(`routesData`, routesData);

    const handleFilter = (e) => {
        console.log(`e.target.name`, e.target.name);
        setFilter(e.target.name);
    };

    useEffect(() => {
        if (!filter) {
            socket.emit("allRoutes");
        } else socket.emit("specific route", filter);
        console.log(`location on USE EFFECT`, filter);

        return () => {
            console.log();
        };
    }, [filter]);

    // var slider = document.getElementById("myRange");
    // var output = document.getElementById("demo");
    // output.innerHTML = slider.value; // Display the default slider value

    // // Update the current slider value (each time you drag the slider handle)
    // slider.oninput = function () {
    //     output.innerHTML = this.value;
    // };

    return (
        <>
            <div className="find-routes-container">
                <div className="search-option-container">
                    <button name="city" onClick={(e) => handleFilter(e)}>
                        CITY
                    </button>
                    <button name="lake" onClick={(e) => handleFilter(e)}>
                        LAKE
                    </button>
                    <button name="forest" onClick={(e) => handleFilter(e)}>
                        FOREST
                    </button>
                    {/* <div className="slidecontainer">
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value="50"
                            id="myRange"
                        ></input>
                    </div> */}
                    <button name="easy" onClick={(e) => handleFilter(e)}>
                        EASY
                    </button>
                    <button
                        name="intermediate"
                        onClick={(e) => handleFilter(e)}
                    >
                        INTERMEDIATE
                    </button>
                </div>
                <div className="result-input">
                    {routesData &&
                        routesData.map((route, i) => (
                            <div className="routes-result-container" key={i}>
                                <div className="pic-link">
                                    <Link to={`route/${route.id}`}>
                                        <img
                                            className="result-icon"
                                            src="/img/route-pic/city/city_01.png"
                                        ></img>
                                    </Link>
                                </div>
                                <div className="route-information">
                                    <h3>{route.name}</h3>
                                    <h3>{route.location}</h3>
                                    <h3>{route.path}</h3>
                                    <h3>{route.grade}</h3>
                                    <h3>{route.distance}</h3>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
