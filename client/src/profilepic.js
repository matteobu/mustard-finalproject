export default function ({ imageUrl, first, last, clickHandler }) {
    return (
        <img
            className="profile-pic"
            src={imageUrl}
            alt={`${first} ${last}`}
            onClick={clickHandler}
        ></img>
    );
}
