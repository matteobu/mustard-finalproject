// FUNCTION COMPONENT
import { Registration } from "./registration";
import { Login } from "./login";
import { Reset } from "./reset";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export default function Welcome() {
    return (
        //  REACT FRAGMENT
        <BrowserRouter>
            <div className="body-container">
                <div className="navbar">
                    <Link to="/">
                        <img
                            className="logo"
                            src="/img/logoBPb.png"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="central-container">
                    <Switch>
                        <Route path="/reset">
                            <Reset />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                    </Switch>
                </div>

                <footer>©2021. FAR NOT FAST</footer>
            </div>
        </BrowserRouter>
    );
}
