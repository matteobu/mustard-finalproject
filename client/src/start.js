import ReactDOM from "react-dom";
import Welcome from "./welcome.js";

// ReactDOM.render(<Welcome />, document.querySelector("main"));
fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.usersID) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <div className="logo-navbar">
                    <img src="/logoB.png" alt="logo" />
                </div>,
                document.querySelector("main")
            );
        }
    });

//
//
// **********************
// NOTES FROM ENCTOUNTERS 💥
// **********************

// import HelloWorld from "./helloWorld";
// ReactDOM.render(<HelloWorld />, document.querySelector("main"));
