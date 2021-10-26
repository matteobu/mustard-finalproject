import ReactDOM from "react-dom";
// import SayingHello from "./SayingHello";
import Welcome from "./welcome.js";
import Main from "./main";

import App from "./app";
// REDUX PART
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer";

// SOCKET PART
// import { io } from "socket.io-client";
import { init } from "./socket";
// const socket = io.connect();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

// socket.on("greeting", (data) => {
//     console.log("data", data);
// });

// socket.emit("thanks", {
//     info: ["thanks for the message"],
// });

const elem = (
    <Provider store={store}>
        <App  />
    </Provider>
);

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userID) {
            console.log(`data.userID`, data.userID);
            // ReactDOM.render(<Welcome />, document.querySelector("main"));
            ReactDOM.render(<Main />, document.querySelector("main"));
            // ReactDOM.render(<SayingHello />, document.querySelector("main"));
        } else {
            init(store);
            ReactDOM.render(elem , document.querySelector("main"));
        }
    });
