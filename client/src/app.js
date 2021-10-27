// FUNCTION COMPONENT
import { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import FindRoute from "./find-route";
import Profile from "./profile";
import Thanks from "./thanks";
import Main from "./main";
import RouteProfile from "./route-profile";

export default class APP extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}

    render() {
        // if (!this.state.userID) {
        //     return <div>Loading...</div>;
        // }
        return (
            <BrowserRouter>
                <div className="body-container">
                    <div className="navbar">
                        <img
                            className="logo"
                            src="/img/logo/logo-small.png"
                            alt="logo"
                        />
                        <div className="navbar-menu">
                            <a href="/thanks">
                                <h6 className="thanks">THANK YOU |</h6>
                            </a>
                            <a href="/">
                                <h6>HOME |</h6>
                            </a>
                            <a href="/find-route">
                                <h6>FIND ROUTE |</h6>
                            </a>
                            <Link to="/profile">
                                <h6> FAVS ♥️ |</h6>
                            </Link>
                            <a href="/logout">
                                <h6>LOGOUT |</h6>
                            </a>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/thanks">
                            <Thanks first={this.state.first} />
                        </Route>
                        <Route exact path="/">
                            <FindRoute first={this.state.first} />
                        </Route>
                        <Route path="/find-route">
                            <FindRoute first={this.state.first} />
                        </Route>
                        <Route path="/profile">
                            <Profile first={this.state.userID} />
                        </Route>
                        <Route path="/route/:routeID">
                            <RouteProfile userID={this.state.userID} />
                        </Route>
                    </Switch>
                    <footer>©2021. Bike Tour in Berlin</footer>
                </div>
            </BrowserRouter>
        );
    }
}
