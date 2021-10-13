import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FriendshipButton(props) {
    const [friendship, setFriendship] = useState({});

    // console.log("PROPS IN FRIENDSHIP BUTTON", props);
    const { otherUserID, userID } = props;
    // console.log("OHTER USER", otherUserID);
    console.log(" friendship", friendship);
    // console.log(" recipient_id", friendship.recipient_id);
    // console.log(" accepted", friendship.accepted);
    // console.log(" id", friendship.id);
    // console.log(" sender_id", friendship.sender_id);

    const handleButton = (e) => {
        // console.log("FRIEND REQUEST BUTTON WORKS");

        if (e.target.name == "send") {
            console.log("SEND BUTTON");
            let step = 0;
            fetch(`/manage-friendship/${step}`, {
                method: "POST",
                body: JSON.stringify(props),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((value) => {
                    setFriendship(value);
                });
        } else if (e.target.name == "cancel") {
            console.log("CANCEL BUTTON");
            let step = 1;
            fetch(`/manage-friendship/${step}`, {
                method: "POST",
                body: JSON.stringify(props),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((value) => {
                    setFriendship(value);
                });
        } else if (e.target.name == "accept") {
            console.log("ACCEPT BUTTON");
            let step = 2;
            fetch(`/manage-friendship/${step}`, {
                method: "POST",
                body: JSON.stringify(props),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((value) => {
                    setFriendship(value);
                });
        }
    };

    useEffect(() => {
        let abort = false;
        if (!abort) {
            // console.log("FRIENDSHIP COMPONENT OPEN");
            fetch(`/check-friendship/${otherUserID}`)
                .then((res) => res.json())
                .then((value) => {
                    setFriendship(value);
                });
        }
        return () => {
            console.log("cleanup function");
            abort = true;
        };
    }, []);

    return (
        <>
            <div className="friendship-button-container">
                {friendship.step == 0 && (
                    <button onClick={handleButton} name="send">
                        SEND FRIEND REQUEST
                    </button>
                )}
                {friendship.step == 1 && (
                    <button onClick={handleButton} name="cancel">
                        {" "}
                        CANCEL FRIEND REQUEST
                    </button>
                )}
                {friendship.step == 2 && (
                    <button onClick={handleButton} name="accept">
                        ACCEPT FRIEND REQUEST
                    </button>
                )}
                {friendship.step == 3 && (
                    <button onClick={handleButton} name="cancel">
                        {" "}
                        UNFRIEND
                    </button>
                )}
            </div>
        </>
    );
}
