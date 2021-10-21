import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat(props) {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state.messages);
    const onlineUsers = useSelector(
        (state) =>
            state.onliners &&
            state.onliners.filter(
                (user) =>
                    user.id != props.userID &&
                    user.sender_id != props.userID &&
                    user.recipient_id != props.userID
            )
    );

    const onlineFriends = useSelector(
        (state) =>
            state.onliners &&
            state.onliners.filter(
                (user) =>
                    user.id != props.userID &&
                    user.accepted == true &&
                    (user.sender_id == props.userID ||
                        user.recipient_id == props.userID)
            )
    );

    console.log("props.userID  :>> ", props.userID);
    console.log("here are onlineUsers: ", onlineUsers);
    console.log("here are onlineFriends: ", onlineFriends);
    // console.log("pros in CHAT:>> ", props.userID);
    // console.log("here are my friends users: ", onlineFri⁄ends);
    // console.log("here are my friends ID: ", onlineFriends);
    // console.log("here are my online users ID: ", onlineUsers.onliners.id);
    // console.log("here are chatMessages: ", chatMessages);
    // console.log("here are onlineFriends: ", onlineFriends);
    // console.log("here are  ", chatMessages?.messages[0].message);

    useEffect(() => {
        // console.log("chat hooks component has MOUNTED");
        // console.log("elem Ref is ==> ", elemRef);

        // console.log("scroll top: ", elemRef.current.scrollTop);
        // console.log("clientHeight: ", elemRef.current.clientHeight);
        // console.log("scrollHeight: ", elemRef.current.scrollHeight);

        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat-and-online-container">
            <div className="chat-container">
                <div className="up-bar-chat">
                    {" "}
                    <h4> CHAT WITH OTHER USERS </h4>
                </div>
                <div className="chat-messages-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((message, i) => (
                            <div className="chat-message" key={i}>
                                <a href={`bikerz/${message.sender_id}`}>
                                    {" "}
                                    <img
                                        className="result-icon-on-chat"
                                        src={message.pic_url}
                                    ></img>
                                </a>

                                <h6>{message.first}</h6>
                                <h4>{message.message}</h4>
                            </div>
                        ))}
                </div>
                <textarea
                    placeholder="Add your message here"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>

            <div className="online-container">
                {onlineUsers &&
                    onlineUsers.map((onlineUser, i) => (
                        <div className="onliners" key={i}>
                            <img
                                className="result-icon-on-chat"
                                src={onlineUser.pic_url}
                            ></img>
                        </div>
                    ))}

                {onlineFriends &&
                    onlineFriends.map((friend, i) => (
                        <div className="friends-pic-online" key={i}>
                            <a href={`bikerz/${friend.id}`}>
                                {" "}
                                <img
                                    className="friends-icon-on-chat"
                                    src={friend.pic_url}
                                ></img>
                            </a>
                        </div>
                    ))}
            </div>
        </div>
    );
}

// import { useEffect, useRef } from "react";
// import { socket } from "./socket";
// import { useSelector } from "react-redux";

// export default function Chat() {
//     const elemRef = useRef;
//     const chatMessages = useSelector((state) => state && state.chatMessages);
//     const keyCheck = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             console.log("MESSAGE", e.target.value);
//             socket.emit("newChatMessage", e.target.value);
//             e.target.value = "";
//         }
//     };

//     useEffect(() => {
//         console.log("CHAT HAS MOUNTED");
//         console.log("elemRef :>> ", elemRef);
//         console.log('"scroll top: " :>> ', elemRef.current.scrollTop);
//         console.log('"client height : " :>> ', elemRef.current.clientHeight);
//         console.log('"scroll height: " :>> ', elemRef.current.scrolltHeight);

//         elemRef.current.scrollTop =
//             elemRef.current.scrolltHeight - elemRef.current.clientHeight;

//         return () => {};
//     }, [chatMes]);
//     return (
//         <>
//             <div className="chat-container">
//                 <div className="chat-messages-container" ref={useRef}>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                     <p> chat message</p>
//                 </div>
//                 <textarea
//                     placeholder="add your message"
//                     onKeyDown={keyCheck}
//                 ></textarea>
//             </div>
//         </>
//     );
// }
