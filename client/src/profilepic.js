import { useDispatch, useSelector } from "react-redux";
import { checkFriendRequest } from "./redux/users/slice.js";

export default function ({
    imageUrl,
    first,
    last,
    clickHandler,
    className,
    userID,
}) {
    const dispatch = useDispatch();
    dispatch(checkFriendRequest());
    const wannabes = useSelector(
        (state) =>
            state.users &&
            state.users.filter(
                (user) => user.accepted == false && userID == user.recipient_id
            )
    );
    console.log("wannabes :>> ", wannabes);

    return (
        <>
            {wannabes && <div className="notificationDot"> </div>}

            <img
                className={className}
                src={imageUrl}
                alt={`${first} ${last}`}
                onClick={clickHandler}
            ></img>
        </>
    );
}
