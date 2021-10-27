import ReactDOM from "react-dom";
import Main from "./main";
import App from "./app";
// REDUX PART
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer";

import { init } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);


const elem = (
    <Provider store={store}>
        <App  />
    </Provider>
);

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userID) {
            ReactDOM.render(<Main />, document.querySelector("main"));
        } else {
            init(store);
            ReactDOM.render(elem , document.querySelector("main"));
        }
    });
