import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

export default function OtherUserProfile(props) {
    const [bikerz, setBikerz] = useState();
    // const [history, setHistory] = useState({});
    const { otherUserId } = useParams();
    // console.log("props in OTHER USER PROFILE :>> ", props);
    const history = useHistory();
    // console.log("history", history);
    // console.log("bikerz :>> ", bikerz);
    // console.log("bikerz :>> ", bikerz.first);
    // console.log("params", params);
    useEffect(() => {
        let abort = false;
        // console.log("OTHER PROFILE JUST MOUNTED");
        // console.log("params ID from app.js", otherUserId);
        if (!abort) {
            if (otherUserId == props.usersID) {
                history.push("/");
            } else {
                fetch(`/bikerz/${otherUserId}`)
                    .then((res) => res.json())
                    .then(({ rows }) => {
                        // console.log("ROWS :>> ", rows);
                        setBikerz(rows);
                    })
                    .catch(console.log);
            }
        }
        return () => {
            console.log("cleanup function");
            abort = true;
        };
    }, []);

    return (
        <>
            {bikerz &&
                bikerz.map((biker, i) => (
                    <div className="profile-container" key={i}>
                        <div className="profile-right-container">
                            <h2>
                                profile of : {biker.first} {biker.last}
                            </h2>
                            <h1>
                                <div>
                                    <div>
                                        <div className="my-bio">
                                            <h3> {biker.first}'s bio:</h3>{" "}
                                            {biker.bio}
                                        </div>
                                    </div>
                                </div>
                            </h1>
                        </div>

                        <div className="profile-container-pic">
                            <img
                                className="profile-pic-big"
                                src={biker.pic_url}
                                alt={`${biker.first} ${biker.last}`}
                            ></img>
                        </div>
                    </div>
                ))}
        </>
    );
}
