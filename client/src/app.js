// import React from "react";
import { Component } from "react";
import ProfilePic from "./profilepic";
import { Uploader } from "./uploader";
import { BrowserRouter, Link } from "react-router-dom";

export default class APP extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("APP MOUNTED");
        fetch("/user.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("data from user.json", data);
                this.setState(data);
            });
    }

    // clickHandler() {
    //     console.log("PROFILE PIC CLCKED");
    // }
    render() {
        console.log("RENDER DONE");
        // console.log("this.state :>> ", this.state);
        if (!this.state.usersID) {
            return <div>Loading...</div>;
        }
        return (
            <>
                <div className="body-container">
                    <div className="navbar">
                        <img
                            className="logo-container"
                            src="/img/logo/no-logo-long-BPw.png"
                            alt="logo"
                        />

                        <ProfilePic
                            imageUrl={this.state.imageUrl}
                            first={this.state.first}
                            last={this.state.last}
                            clickHandler={() => {
                                this.setState({
                                    uploaderIsVisible: true,
                                });
                            }}
                        />
                    </div>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        usersID={this.state.usersID}
                        clickHandler={() => {}}
                    />
                )}
            </>
        );
    }
}
