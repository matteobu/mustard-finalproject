import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import FriendshipButton from "./friendshipBtn";

export default function OtherUserProfile(props) {
    // console.log("props in OTHER USERS :>> ", props);
    const [bikerz, setBikerz] = useState({});
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
                        props.functioErrorAppears();
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

    return (
        <>
            <div className="profile-container-other">
                <div className="profile-right-container">
                    <h2>
                        profile of : {bikerz.first} {bikerz.last}
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
                </div>
                <FriendshipButton
                    userID={props.userID}
                    otherUserID={otherUserID}
                />
            </div>
        </>
    );
}
