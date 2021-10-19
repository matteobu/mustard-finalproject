// FUNCTION COMPONENT
import { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import FindBikerz from "./find-bikerz";
import FriendsList from "./friends";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import OtherUserProfile from "./otherUserProfile";
import { Uploader } from "./uploader";
import { MenuBar } from "./menu-bar";
import Chat from "./chat";

export default class APP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picProfileSmall: "profile-pic-small",
            picProfilebig: "profile-pic-big",
            cameraPic: "./img/profile-pic/change-pic.png",
            chatReduced: true,
        };

        this.functionUploadImage = this.functionUploadImage.bind(this);
        this.functionCloseMenuBar = this.functionCloseMenuBar.bind(this);
        this.storeBioInApp = this.storeBioInApp.bind(this);
        this.functioErrorAppears = this.functioErrorAppears.bind(this);
        this.notificationDot = this.notificationDot.bind(this);
    }
    async componentDidMount() {
        console.log("APP MOUNTED");
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
    notificationDot() {
        this.setState((oldState) => ({
            notificationDot: !oldState.notificationDot,
        }));
    }

    render() {
        if (!this.state.userID) {
            return <div>Loading...</div>;
        }
        return (
            <BrowserRouter>
                <div className="body-container">
                    {this.state.errorIsVisible && (
                        <div className="bikerz-not-found-message">
                            <h1>SORRY BIKERZ NOT FOUND, TRY AGAIN</h1>
                        </div>
                    )}
                    {this.state.notificationDot && (
                        <div className="notificationDot"></div>
                    )}
                    <div className="navbar">
                        <Link to="/">
                            <img
                                className="logo"
                                src="/img/logo/logoBPb.png"
                                alt="logo"
                            />
                        </Link>
                        <ProfilePic
                            userID={this.state.userID}
                            className={this.state.picProfileSmall}
                            imageUrl={this.state.imageUrl}
                            first={this.state.first}
                            last={this.state.last}
                            clickHandler={() => {
                                this.setState((oldState) => ({
                                    menuIsVisible: !oldState.menuIsVisible,
                                }));
                            }}
                        />
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <Profile
                                bio={this.state.bio}
                                className={this.state.picProfilebig}
                                imageUrl={this.state.imageUrl}
                                cameraPic={this.state.cameraPic}
                                first={this.state.first}
                                last={this.state.last}
                                storeBioInApp={this.storeBioInApp}
                                clickHandler={() => {
                                    this.setState((oldState) => ({
                                        uploaderIsVisible:
                                            !oldState.uploaderIsVisible,
                                    }));
                                }}
                            />{" "}
                        </Route>
                        <Route path="/find-bikerz">
                            <FindBikerz first={this.state.first} />
                        </Route>
                        <Route path="/chat">
                            <Chat first={this.state.first} />
                        </Route>
                        <Route path="/friends">
                            <FriendsList userID={this.state.userID} />
                        </Route>
                        <Route path="/bikerz/:otherUserID">
                            <OtherUserProfile
                                userID={this.state.userID}
                                functioErrorAppears={this.functioErrorAppears}
                                notificationDot={this.notificationDot}
                            />
                        </Route>
                    </Switch>
                    <footer>©2021. BIKEPACKING IRGENDWO</footer>
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
                {/* {this.state.chatReduced && (
                    <Chat
                        userID={this.state.userID}
                        imageUrl={this.state.imageUrl}
                        // functionCloseMenuBar={this.functionCloseMenuBar}
                    />Chat
                )} */}

                {/* ⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️ HERE ABOVE ARE LISTED THE MODAL THAT CAN APPEAR OR DISAPPEAR ACCORDING TO THE RELATIVE onCLICK FUNCTIONS */}
            </BrowserRouter>
        );
    }
}

// OLD APP FUNCTION COMPONENT PLEASE DO NOT CUT OR PASTE OR MODIFY THIS LINES BELOW JUST COPY

// <>
//     <div className="body-container">
//         <div className="navbar">
//             <img
//                 className="logo"
//                 src="/img/logo/logoBPw.png"
//                 alt="logo"
//             />

//             <ProfilePic
//                 className={this.state.picProfileSmall}
//                 imageUrl={this.state.imageUrl}
//                 first={this.state.first}
//                 last={this.state.last}
//                 clickHandler={() => {
//                     this.setState((oldState) => ({
//                         menuIsVisible: !oldState.menuIsVisible,
//                     }));
//                 }}
//             />
//         </div>
//         {/* <div className="profile-pic-big-container"> */}
//         <Profile
//             bio={this.state.bio}
//             className={this.state.picProfilebig}
//             imageUrl={this.state.imageUrl}
//             cameraPic={this.state.cameraPic}
//             first={this.state.first}
//             last={this.state.last}
//             storeBioInApp={this.storeBioInApp}
//             clickHandler={() => {
//                 this.setState((oldState) => ({
//                     uploaderIsVisible: !oldState.uploaderIsVisible,
//                 }));
//             }}
//         />
//         {/* </div> */}
//         <footer>©2021. BIKEPACKING IRGENDWO</footer>
//     </div>

//     {this.state.uploaderIsVisible && (
//         <Uploader
//             userID={this.state.userID}
//             imageUrl={this.state.imageUrl}
//             functionUploadImage={this.functionUploadImage}
//         />
//     )}
//     {this.state.menuIsVisible && (
//         <MenuBar
//             userID={this.state.userID}
//             imageUrl={this.state.imageUrl}
//             // functionUploadImage={this.functionUploadImage}
//         />
//     )}
// </>
