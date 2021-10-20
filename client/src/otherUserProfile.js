import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import FriendshipButton from "./friendshipBtn";
import { socket } from "./socket";
import PvtChat from "./pvt-chat";

export default function OtherUserProfile(props) {
    // console.log("props in OTHER USERS :>> ", props);
    const [bikerz, setBikerz] = useState({});
    const [privateChat, setPrivateChat] = useState(false);
    // const [history, setHistory] = useState({});
    const params = useParams();
    const { otherUserID } = useParams();
    // console.log("params :>> ", params);
    const history = useHistory();
    // console.log("history", history);
    // console.log("before bikerz :>> ", bikerz);

    useEffect(() => {
        let abort = false;

        if (!abort) {
            fetch(`/bikerz/${otherUserID}.json`)
                .then((res) => res.json())
                .then(({ rows }) => {
                    console.log("ROWS IN OTHER USER PROFILE", rows);
                    if (otherUserID == props.userID) {
                        history.push("/");
                    } else if (rows[0] == undefined) {
                        props.storeBioInApp();
                        history.push("/find-bikerz");
                    } else setBikerz(rows[0]);
                })
                .catch(console.log);
        }
        return () => {
            console.log("cleanup function");
            abort = true;
        };
    }, []);
    const handleButton = () => {
        setPrivateChat(true || false);

        console.log("otherUserID :>> ", otherUserID);
        console.log("props.userID :>> ", props.userID);
        const usersOnPrivateChat = {
            otherUserID: otherUserID,
            userID: props.userID,
        };
        socket.emit("private chat opened", usersOnPrivateChat);
        // console.log("CHAT BUTTON WORKS");
        // console.log("props in OTHER PROFILE:>> ", props);
        props.privateChatFunction(otherUserID);
    };
    return (
        <>
            {privateChat && (
                <PvtChat userID={props.userID} otherUserID={otherUserID} />
            )}

            <div className="profile-container-other">
                <div className="profile-right-container">
                    <h2>
                        {bikerz.first} {bikerz.last}
                    </h2>
                    <h1>
                        <div>
                            <div>
                                <div className="my-bio">
                                    <h3> {bikerz.first}&#39;s bio:</h3>{" "}
                                    {bikerz.bio}
                                </div>
                            </div>
                        </div>
                    </h1>
                </div>

                <div className="profile-container-pic">
                    <img
                        className="result-icon"
                        src={bikerz.pic_url}
                        alt={`${bikerz.first} ${bikerz.last}`}
                    ></img>
                    <FriendshipButton
                        userID={props.userID}
                        otherUserID={otherUserID}
                        notificationDot={props.notificationDot}
                    />
                    {bikerz.accepted && (
                        <button onClick={handleButton} name="chat">
                            CHAT
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
