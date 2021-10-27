import { socket } from "./socket";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
                            Hi! {userInfo[0].first}, here you can manage you
                            Account, and see which routes are your Favs!
                        </h2>
                    </div>
                    <div className="profile-right-container">
                        Here are your {favoriteRoute.length} favorites Routes!
                        {favoriteRoute &&
                            favoriteRoute.map((fav, i) => (
                                <div
                                    className="favorite-routes-container"
                                    key={i}
                                >
                                    <h4>{fav.name}</h4>
                                    {fav.location}, {fav.path}, {fav.grade}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
}
