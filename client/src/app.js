// FUNCTION COMPONENT
import { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import FindBikerz from "./find-bikerz";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import OtherUserProfile from "./otherUserProfile";
import { Uploader } from "./uploader";
import { MenuBar } from "./menu-bar";

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
        // this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        console.log("APP MOUNTED");
        // console.log("this.state on APP", this.state);
        fetch("/user.json")
            .then((response) => response.json())
            .then((data) => {
                // console.log("data from user.json", data.bio);
                if (data.bio) {
                    this.setState(data);
                } else {
                    this.setState(data);
                    this.setState({
                        bio: `Now, this is the story all about how my life got flipped-turned upside down and I'd like to take a minute, just sit right there I'll tell you how I became the prince of a town called Bel Air`,
                    });
                }
            });
    }
    // logOut() {
    //     // console.log("APP MOUNTED");
    //     fetch("/logout")
    //         .then((response) => response.json())
    //         .then((data) => {});
    // }

    functionUploadImage(newUrl) {
        // console.log("FUNCTION UPLOAD IS RUNNING");

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

    storeBioInApp(bioOfficial) {
        // console.log("bioOfficial :>> ", bioOfficial);
        this.setState(() => ({
            bio: bioOfficial,
        }));
    }

    render() {
        // console.log(this.state.usersID);
        // console.log("APP RENDER");
        // console.log("this.state.imageUrl :>> ", this.state.imageUrl);

        if (!this.state.usersID) {
            return <div>Loading...</div>;
        }
        return (
            <BrowserRouter>
                <div className="body-container">
                    <div className="navbar">
                        <Link to="/">
                            <img
                                className="logo"
                                src="/img/logo/logoBPb.png"
                                alt="logo"
                            />
                        </Link>
                        <ProfilePic
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
                        <Route path="/bikerz/:otherUserId">
                            <OtherUserProfile usersID={this.state.usersID} />
                        </Route>
                    </Switch>
                </div>
                <footer>©2021. BIKEPACKING IRGENDWO</footer>
                {/* ⬇️⬇️⬇️⬇️⬇️⬇️ HERE BELOW ARE LISTED THE MODAL THAT CAN APPEAR OR DISAPPEAR ACCORDING TO THE RELATIVE onCLICK FUNCTIONS */}
                {this.state.uploaderIsVisible && (
                    <Uploader
                        usersID={this.state.usersID}
                        imageUrl={this.state.imageUrl}
                        functionUploadImage={this.functionUploadImage}
                    />
                )}
                {this.state.menuIsVisible && (
                    <MenuBar
                        usersID={this.state.usersID}
                        imageUrl={this.state.imageUrl}
                        functionCloseMenuBar={this.functionCloseMenuBar}
                    />
                )}
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
//             usersID={this.state.usersID}
//             imageUrl={this.state.imageUrl}
//             functionUploadImage={this.functionUploadImage}
//         />
//     )}
//     {this.state.menuIsVisible && (
//         <MenuBar
//             usersID={this.state.usersID}
//             imageUrl={this.state.imageUrl}
//             // functionUploadImage={this.functionUploadImage}
//         />
//     )}
// </>
