import { socket } from "./socket";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile(props) {
    useEffect(() => {
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
