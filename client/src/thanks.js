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
            <div className="thanks-container">
                <h1> THANK YOU EVERYONE!</h1>
            </div>
        </>
    );
}
