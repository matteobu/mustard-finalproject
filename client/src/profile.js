import { socket } from "./socket";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile(props) {
    const userInfo = useSelector((state) => state.user);
    const favoriteRoute = useSelector((state) => state.fav);

    useEffect(() => {
        socket.emit("user-profile");
        socket.emit("favorite route for my User");

        return () => {};
    }, []);

    return (
        <>
            PROVA
            {userInfo && favoriteRoute && (
                <div className="profile-container">
                    <div className="profile-left-container">
                        <h2>
                            Hi! {userInfo[0].first}, here you can see which routes are your Favs!
                        </h2>
                    </div>
                    <div className="profile-right-container">
                        {favoriteRoute &&
                            favoriteRoute.map((fav, i) => (
                                <div className={fav.location} key={i}>
                                    <Link to={`route/${fav.id}`}>
                                        <div className="pic-link">
                                            <img
                                                id="immagine"
                                                src={`/img/route-pic/${fav.id}_${fav.location}.png`}
                                            ></img>
                                        </div>
                                    </Link>
                                    <div className="route-information">
                                        <h2>{fav.name}</h2>
                                        <h3>
                                            {fav.location} - ({fav.distance}
                                            KM)
                                        </h3>

                                        <h6 className={fav.grade}>
                                            {fav.grade}, {fav.path},{" "}
                                        </h6>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
}
