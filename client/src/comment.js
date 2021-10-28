import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Comment(props) {
    // console.log("PROPS ON PRIVATE CHAT :>> ", props);
    const elemRef = useRef();
    const commentsOnRoute = useSelector((state) => state.comment);
    // console.log(`commentsOnRoute`, commentsOnRoute);
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const routeToAddComment = {
                routeID: props.routeID,
                message: e.target.value,
            };
            socket.emit("new comment", routeToAddComment);
            e.target.value = "";
        }
    };

    return (
        <div className="comments-component">
            <div className="comment-container">
                <div className="comments-message-container" ref={elemRef}>
                    {commentsOnRoute &&
                        commentsOnRoute.map((comment, i) => (
                            <div className="comment-message" key={i}>
                                <h6>{comment.first}: </h6>
                                <h4>{comment.message}</h4>
                            </div>
                        ))}
                </div>
                <textarea
                    placeholder="Add your comment here"
                    onKeyDown={keyCheck}
                ></textarea>
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
