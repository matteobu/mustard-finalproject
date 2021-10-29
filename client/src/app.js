// FUNCTION COMPONENT
import { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import FindRoute from "./find-route";
import Profile from "./profile";
import Thanks from "./thanks";
import Main from "./main";
import RouteProfile from "./route-profile";
import OpenMap from "./open-map";
import OpenMapTest from "./open-map-test";

export default class APP extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.coordinates = this.coordinates.bind(this);
    }
    // async componentDidMount() {
    // }

    async coordinates(value) {
        console.log(`value on APP`, value);
        this.setState(() => ({
            start: value,
        }));

        WebSocket.console.log(`this.state`, this.state);
    }
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
                                <h6>ROUTE FINDER |</h6>
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
                            <Thanks />
                        </Route>
                        <Route exact path="/">
                            <FindRoute />
                        </Route>
                        <Route path="/find-route">
                            <FindRoute />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/route/:routeID">
                            <RouteProfile coordinates={this.coordinates} />
                        </Route>
                        <Route path="/open-map">
                            <OpenMap start={this.state.start} />
                        </Route>
                        <Route path="/open-map-test">
                            <OpenMapTest start={this.state.start} />
                        </Route>
                    </Switch>
                    <footer>©2021. Bike Tour in Berlin</footer>
                </div>
            </BrowserRouter>
        );
    }
}
