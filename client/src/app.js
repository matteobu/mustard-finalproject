import { Component } from "react";
import ProfilePic from "./profilepic";
import { Uploader } from "./uploader";
import { MenuBar } from "./menu-bar";
import Profile from "./profile";

export default class APP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picProfileSmall: "profile-pic-small",
            picProfilebig: "profile-pic-big",
        };
        this.functionUploadImage = this.functionUploadImage.bind(this);
        this.storeBioInApp = this.storeBioInApp.bind(this);
    }
    componentDidMount() {
        // console.log("APP MOUNTED");
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

    functionUploadImage(newUrl) {
        // console.log("FUNCTION UPLOAD IS RUNNING");

        this.setState((oldState) => ({
            uploaderIsVisible: !oldState.uploaderIsVisible,
            imageUrl: newUrl,
        }));
    }

    storeBioInApp(bioOfficial) {
        // console.log("bioOfficial :>> ", bioOfficial);
        this.setState(() => ({
            bio: bioOfficial,
        }));
    }

    render() {
        // console.log("APP RENDER");
        // console.log("this.state.imageUrl :>> ", this.state.imageUrl);

        if (!this.state.usersID) {
            return <div>Loading...</div>;
        }
        return (
            <>
                <div className="body-container">
                    <div className="navbar">
                        <img
                            className="logo"
                            src="/img/logo/logoBPw.png"
                            alt="logo"
                        />

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

                    <Profile
                        bio={this.state.bio}
                        className={this.state.picProfilebig}
                        imageUrl={this.state.imageUrl}
                        first={this.state.first}
                        last={this.state.last}
                        storeBioInApp={this.storeBioInApp}
                        clickHandler={() => {
                            this.setState((oldState) => ({
                                uploaderIsVisible: !oldState.uploaderIsVisible,
                            }));
                        }}
                    />
                </div>

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
                        // functionUploadImage={this.functionUploadImage}
                    />
                )}
            </>
        );
    }
}
