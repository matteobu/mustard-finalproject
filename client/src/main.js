// FUNCTION COMPONENT
import { Registration } from "./registration";
import { Login } from "./login";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";


export default function Main() {
    return (
        <BrowserRouter>
            <div className="body-container">
                <div className="navbar">
                    <Link to="/">
                        <img
                            className="logo"
                            src="/img/logo/logo-small.png"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="central-container">
                    <div className="left-registration">
                        <div>
                            <img
                                className="logo-container"
                                src="/img/logo/logo-home.png"
                                alt="logo"
                            />
                            <h1>
                                A website where you can find the perfect route
                                for you! Regardless you want to ride in the
                                city, to a lake or trough the forest, just ride!
                            </h1>
                        
                        </div>
                    </div>
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                    </Switch>
                </div>
                <footer>©2021. Bike Tour in Berlin </footer>
            </div>
        </BrowserRouter>
    );
}
