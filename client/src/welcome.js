// FUNCTION COMPONENT
import { Registration } from "./registration";
import { Login } from "./login";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function Welcome() {
    return (
        //  REACT FRAGMENT
        <BrowserRouter>
            <div  className="body-container">
                <div className="navbar">
                    <img className="logo" src="/logoBPb.png" alt="logo" />
                </div>
                <div className="central-container">
                    <Switch>
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
