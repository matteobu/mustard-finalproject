// props in the Child is always an Object

export default function Greetee(props) {
    console.log("props in Greetee :>> ", props);
    return <span>{props.name || "Spiced Teacher!"}</span>;
}
