import ReactDOM from "react-dom";
// import SayingHello from "./SayingHello";
import Welcome from "./welcome.js";
import App from "./app";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userID) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
            // ReactDOM.render(<SayingHello />, document.querySelector("main"));
        } else {
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    });
