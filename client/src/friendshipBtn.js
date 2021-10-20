import { useState, useEffect } from "react";

export default function FriendshipButton(props) {
    const [friendship, setFriendship] = useState({});

    const fetchFunction = async (step) => {
        const result = await fetch(`/manage-friendship/${step}`, {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => console.log(err));

        const data = await result.json();
        setFriendship(data);
    };

    const handleButton = (e) => {
        if (e.target.name == "send") {
            console.log("SEND BUTTON");
            let step = 0;
            fetchFunction(step);
        } else if (e.target.name == "cancel") {
            console.log("CANCEL BUTTON");
            let step = 1;
            fetchFunction(step);
        } else if (e.target.name == "accept") {
            console.log("ACCEPT BUTTON");
            let step = 2;
            fetchFunction(step);
        }
    };

    useEffect(() => {
        let abort = false;
        if (!abort) {
            fetch(`/check-friendship/${props.otherUserID}`)
                .then((res) => res.json())
                .then((value) => {
                    setFriendship(value);
                    // if (friendship.step == 2) {
                    //     props.notificationDot();
                    // }
                });
        }
        return () => {
            console.log("cleanup function");
            abort = true;
        };
    }, []);

    return (
        <div className="friendship-button-container">
            {friendship.step == 0 && (
                <button onClick={handleButton} name="send">
                    add FRIEND
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
                    UNFRIEND --
                </button>
            )}

        </div>
    );
}

// // OLD BUTTON HANDLER
// const handleButton = (e) => {
//     // const [friendship, setFriendship] = checkFriendshipOnServer(
//     //     `/manage-friendship/${step}`,
//     //     friendship, props, step
//     // );

//     if (e.target.name == "send") {
//         console.log("SEND BUTTON");
//         let step = 0;
//         fetchFunction(step);

//         // console.log("SEND BUTTON");
//         // let step = 0;
//         // fetch(`/manage-friendship/${step}`, {
//         //     method: "POST",
//         //     body: JSON.stringify(props),
//         //     headers: {
//         //         "Content-Type": "application/json",
//         //     },
//         // })
//         //     .then((res) => res.json())
//         //     .then((value) => {
//         //         setFriendship(value);
//         //     });
//     } else if (e.target.name == "cancel") {
//         console.log("CANCEL BUTTON");
//         let step = 1;
//         fetch(`/manage-friendship/${step}`, {
//             method: "POST",
//             body: JSON.stringify(props),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//             .then((res) => res.json())
//             .then((value) => {
//                 setFriendship(value);
//             });
//     } else if (e.target.name == "accept") {
//         console.log("ACCEPT BUTTON");
//         let step = 2;
//         fetch(`/manage-friendship/${step}`, {
//             method: "POST",
//             body: JSON.stringify(props),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//             .then((res) => res.json())
//             .then((value) => {
//                 setFriendship(value);
//             });
//     }
// };

// useEffect(() => {
//     let abort = false;
//     if (!abort) {
//         // console.log("FRIENDSHIP COMPONENT OPEN");
//         fetch(`/check-friendship/${otherUserID}`)
//             .then((res) => res.json())
//             .then((value) => {
//                 setFriendship(value);
//                 // if (friendship.step == 2) {
//                 //     props.notificationDot();
//                 // }
//             });
//     }
//     return () => {
//         console.log("cleanup function");
//         abort = true;
//     };
// }, []);
