import { socket } from "./socket";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Profile(props) {
    const userInfo = useSelector((state) => state.user);
    const favoriteRoute = useSelector((state) => state.fav);
    console.log(`PROFILE OPEN`, favoriteRoute);

    useEffect(() => {
        socket.emit("user-profile");
        socket.emit("favorite route for my User");

        return () => {};
    }, []);

    return (
        <>
            {userInfo && favoriteRoute && (
                <div className="profile-container">
                    <div className="profile-left-container">
                        <h2>
                            Hi! {userInfo[0].first}, here you can manage you
                            Account, and see which routes are your{" "}
                            {favoriteRoute[0].id}
                        </h2>
                    </div>
                    <div className="profile-right-container"></div>
                </div>
            )}
        </>
    );
}
