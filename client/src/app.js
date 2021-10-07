import { Component } from "react";
import ProfilePic from "./profilepic";
import { Uploader } from "./uploader";

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
                // console.log("data from user.json", data);
                this.setState(data);
            });
    }

    render() {
        console.log("RENDER DONE");
        // console.log("this.state.imageUrl :>> ", this.state.imageUrl);

        if (!this.state.usersID) {
            return <div>Loading...</div>;
        }
        return (
            <>
                <div className="body-container">
                    <div className="navbar">
                        <img
                            className="logo-container"
                            src="/img/logo/logoBPw.png"
                            alt="logo"
                        />

                        <ProfilePic
                            imageUrl={this.state.imageUrl}
                            first={this.state.first}
                            last={this.state.last}
                            clickHandler={() => {
                                this.setState((oldState) => ({
                                    uploaderIsVisible:
                                        !oldState.uploaderIsVisible,
                                }));
                            }}
                        />
                    </div>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        usersID={this.state.usersID}
                        imageUrl={this.state.imageUrl}
                        clickHandler={() => {
                            this.setState({
                                imageUrl: this.state.imageUrl,
                            });
                        }}
                    />
                )}
            </>
        );
    }
}
