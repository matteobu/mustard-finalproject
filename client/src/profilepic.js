export default function ({ imageUrl, first, last, clickHandler, className }) {
    return (
        <img
            className={className}
            src={imageUrl}
            alt={`${first} ${last}`}
            onClick={clickHandler}
        ></img>
    );
}
