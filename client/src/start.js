import ReactDOM from "react-dom";
// import SayingHello from "./SayingHello";
import Welcome from "./welcome.js";
import App from "./app";
import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);
const elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userID) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
            // ReactDOM.render(<SayingHello />, document.querySelector("main"));
        } else {
            ReactDOM.render(elem, document.querySelector("main"));
        }
    });
