import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveUsers,
    receiveFriends,
    cancelReletionship,
} from "./redux/users/slice.js";

export default function FriendsList(props) {
    const { userID } = props;
    const dispatch = useDispatch();
    const wannabes = useSelector(
        (state) =>
            state.users &&
            state.users.filter(
                (user) => user.accepted == false && userID == user.recipient_id
            )
    );
    const myRequests = useSelector(
        (state) =>
            state.users &&
            state.users.filter(
                (user) => user.accepted == false && userID == user.sender_id
            )
    );
    const friends = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted == true)
    );

    useEffect(() => {
        (async () => {
            const results = await fetch("/friends.json");
            const { rows } = await results.json();
            // console.log("data to dispatch :>> ", rows);
            dispatch(receiveUsers(rows));
        })();
    }, []);

    // *************************************************************

    const fetchFunction = async (step, otherUserID) => {
        const result = await fetch(`/manage-friendship/${step}`, {
            method: "POST",
            body: JSON.stringify({ otherUserID }),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => console.log(err));

        const data = await result.json();
        console.log("data after fetch manage-friendship:>> ", data);
        console.log("data after fetch manage-friendship:>> ", otherUserID);

        if (data.step === 0) {
            console.log("STEP 0");
            dispatch(cancelReletionship(otherUserID));
        } else if (data.step === 3) {
            console.log("STEP 3");
            dispatch(receiveFriends(otherUserID));
        }
        // dispatch(receiveFriends(data));
    };

    const handleButton = (e, otherUserID) => {
        if (e.target.name == "cancel") {
            console.log("CANCEL BUTTON");
            console.log("e.target :>> ", e.target.name);
            console.log("e.target :>> ", otherUserID);
            let step = 1;
            fetchFunction(step, otherUserID);
        } else if (e.target.name == "accept") {
            console.log("ACCEPT BUTTON");
            console.log("e.target :>> ", e.target.name);
            console.log("e.target :>> ", otherUserID);
            let step = 2;
            fetchFunction(step, otherUserID);
        }
    };

    // *************************************************************

    // const handleHot = async (id) => {
    //     console.log("HOT 👍");

    //     const data = await fetch(`/hot/${id}`, {
    //         method: "POST",
    //     }).then((res) => res.json());
    //     console.log(data);

    //     if (data.success) {
    //         dispatch(madeHot(id));
    //     }
    // };

    // *************************************************************

    return (
        <>
            {" "}
            <div className="friends-or-wannabes">
                <div className="wannabes">
                    <h6>FRIEND REQUEST(s)</h6>
                    {wannabes &&
                        wannabes.map((wannabe, i) => (
                            <>
                                <Link to={`bikerz/${wannabe.id}`} key={i}>
                                    <div className="result-container">
                                        <img
                                            className="result-icon-friends-wannabes"
                                            src={wannabe.pic_url}
                                        ></img>
                                        <h3>
                                            {wannabe.first} {wannabe.last}
                                        </h3>
                                        <div className="button-wannabe">
                                            <button
                                                className="accept"
                                                name="accept"
                                                onClick={(e) =>
                                                    handleButton(e, wannabe.id)
                                                }
                                            >
                                                👤+
                                            </button>
                                            <button
                                                className="cancel"
                                                name="cancel"
                                                onClick={(e) =>
                                                    handleButton(e, wannabe.id)
                                                }
                                            >
                                                👤-
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ))}
                </div>
                <div className="friends">
                    <h6>FRIEND(s)</h6>
                    {friends &&
                        friends.map((friend, i) => (
                            <>
                                <Link to={`bikerz/${friend.id}`} key={i}>
                                    <div className="result-container">
                                        <img
                                            className="result-icon-friends-wannabes"
                                            src={friend.pic_url}
                                        ></img>
                                        <h3>
                                            {friend.first} {friend.last}
                                        </h3>
                                        <button
                                            className="cancel"
                                            name="cancel"
                                            onClick={(e) =>
                                                handleButton(e, friend.id)
                                            }
                                        >
                                            👤-
                                        </button>
                                    </div>
                                </Link>
                            </>
                        ))}
                </div>
                <div className="myFriendRequest">
                    <h6>MY REQUEST(s)</h6>
                    {myRequests &&
                        myRequests.map((request, i) => (
                            <>
                                <Link to={`bikerz/${request.id}`} key={i}>
                                    <div className="result-container">
                                        <img
                                            className="result-icon-friends-wannabes"
                                            src={request.pic_url}
                                        ></img>
                                        <h3>
                                            {request.first} {request.last}
                                        </h3>
                                        <button
                                            className="cancel"
                                            name="cancel"
                                            onClick={(e) =>
                                                handleButton(e, request.id)
                                            }
                                        >
                                            👤-
                                        </button>
                                    </div>
                                </Link>
                            </>
                        ))}
                </div>
            </div>
        </>
    );
}
