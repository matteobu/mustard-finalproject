import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function OtherUserProfile(props) {
    const [bikerz, setBikerz] = useState({});
    // const [history, setHistory] = useState({});
    const { otherUserId } = useParams();
    const history = useHistory();
    // console.log("history", history);
    console.log("before bikerz :>> ", bikerz);
    useEffect(() => {
        let abort = false;

        if (!abort) {
            fetch(`/bikerz/${otherUserId}.json`)
                .then((res) => res.json())
                .then(({ rows }) => {
                    console.log(rows);
                    if (otherUserId == props.usersID) {
                        history.push("/");
                    } else if (rows[0] == undefined) {
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
            <div className="profile-container">
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
                        className="profile-pic-big"
                        src={bikerz.pic_url}
                        alt={`${bikerz.first} ${bikerz.last}`}
                    ></img>
                </div>
            </div>
        </>
    );
}
