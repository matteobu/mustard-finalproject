// FUNCTION COMPONENT
import { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import FindRoute from "./find-route";
import Profile from "./profile";
import Main from "./main";
import RouteProfile from "./route-profile";
import { Uploader } from "./uploader";
import { MenuBar } from "./menu-bar";
// import Chat from "./chat";
import Map from "./routes";

export default class APP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picProfileSmall: "profile-pic-small",
            picProfilebig: "profile-pic-big",
            cameraPic: "./img/profile-pic/change-pic.png",
        };

        this.functionUploadImage = this.functionUploadImage.bind(this);
        this.functionCloseMenuBar = this.functionCloseMenuBar.bind(this);
        this.storeBioInApp = this.storeBioInApp.bind(this);
        this.functioErrorAppears = this.functioErrorAppears.bind(this);
        // this.nDot = this.notificationDot.bind(this);
        this.privateChatFunction = this.privateChatFunction.bind(this);
    }
    async componentDidMount() {
        const result = await fetch("/user.json").catch((err) =>
            console.log(err)
        );
        const data = await result.json();

        if (data.bio) {
            this.setState(data);
        } else {
            this.setState(data);
            this.setState({
                bio: `Now, this is the story all about how my life got flipped-turned upside down and I'd like to take a minute, just sit right there I'll tell you how I became the prince of a town called Bel Air`,
            });
        }
    }

    functionUploadImage(newUrl) {
        this.setState((oldState) => ({
            uploaderIsVisible: !oldState.uploaderIsVisible,
            imageUrl: newUrl,
        }));
    }
    functionCloseMenuBar() {
        this.setState((oldState) => ({
            menuIsVisible: !oldState.menuIsVisible,
        }));
    }

    functioErrorAppears() {
        this.setState(
            (oldState) => ({
                errorIsVisible: !oldState.errorIsVisible,
            }),
            () => {
                setTimeout(() => {
                    this.setState((oldState) => ({
                        errorIsVisible: !oldState.errorIsVisible,
                    }));
                }, 5000);
            }
        );
    }

    storeBioInApp(bioOfficial) {
        this.setState(() => ({
            bio: bioOfficial,
        }));
    }
    // notificationDot() {
    //     this.setState((oldState) => ({
    //         notificationDot: !oldState.notificationDot,
    //     }));
    // }
    privateChatFunction(otherUserID) {
        console.log("otherUserID :>> ", otherUserID);
        this.setState({
            otherUserID: otherUserID,
        });
        // this.setState((oldState) => ({
        //     privateChat: !oldState.privateChat,
        // }));
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
                            <a href="/">
                                <h6>HOME |</h6>
                            </a>
                            <a href="/find-route">
                                <h6>FIND ROUTE |</h6>
                            </a>
                            <Link to="/profile">
                                <h6> ACCOUNT |</h6>
                            </Link>
                        </div>
                    </div>
                    <Switch>
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
                    <footer>©2021. Route finder</footer>
                </div>
                {/* ⬇️⬇️⬇️⬇️⬇️⬇️ HERE BELOW ARE LISTED THE MODAL THAT CAN APPEAR OR DISAPPEAR ACCORDING TO THE RELATIVE onCLICK FUNCTIONS */}
                {this.state.uploaderIsVisible && (
                    <Uploader
                        userID={this.state.userID}
                        imageUrl={this.state.imageUrl}
                        functionUploadImage={this.functionUploadImage}
                    />
                )}
                {this.state.menuIsVisible && (
                    <MenuBar
                        userID={this.state.userID}
                        imageUrl={this.state.imageUrl}
                        functionCloseMenuBar={this.functionCloseMenuBar}
                    />
                )}

                {/* ⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️ HERE ABOVE ARE LISTED THE MODAL THAT CAN APPEAR OR DISAPPEAR ACCORDING TO THE RELATIVE onCLICK FUNCTIONS */}
            </BrowserRouter>
        );
    }
}
