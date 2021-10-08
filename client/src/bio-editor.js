import { Component } from "react";

export class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftBio: "",
            showBio: true,
        };
        this.storeDraftBio = this.storeDraftBio.bind(this);
        this.openTextArea = this.openTextArea.bind(this);
        this.sendOfficialBio = this.sendOfficialBio.bind(this);
    }

    componentDidMount() {
        console.log("BIO MOUNTED");
    }
    storeDraftBio({ target }) {
        // console.log("target.value :>> ", target.value);
        this.setState(
            {
                draftBio: target.value,
            },
            () => {
                // console.log("registration update", this.state);
            }
        );
    }
    sendOfficialBio() {
        // console.log("this.state.draftBio :>> ", this.state.draftBio);
        fetch("/update-bio", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp);
                if (resp.success) {
                    // console.log("resp.success :>> ", resp.success);
                    // console.log("url from handleuploadpic :>> ", resp.url);
                    // console.log("THIS PROPS :>> ", );
                    this.setState((oldState) => ({
                        showTextArea: !oldState.showTextArea,
                        showBio: !oldState.showBio,
                    }));
                    this.props.storeBioInApp(this.state.draftBio);
                } else {
                    this.setState({
                        error: "whoops, something went wrong. Please try again.",
                    });
                }
            })
            .catch((err) => console.log("error in catch-post-uploadpic", err));
    }

    openTextArea() {
        // console.log("THIS STATE INSIDE BIO-EDITOR", this.state);
        // console.log("PROPS INSIDE BIO-EDITOR", this.props);
        this.setState((oldState) => ({
            showTextArea: !oldState.showTextArea,
            showBio: !oldState.showBio,
        }));
    }
    render() {
        // console.log("PROPS on RENDER BIO-EDITOR>> ", this.props);

        return (
            <div>
                <div className="bio-container">
                    <h6 onClick={this.openTextArea}>my bio:</h6>
                </div>
                {this.state.showBio && <div className="my-bio">{this.props.bio} </div>}
                {this.state.showTextArea && (
                    <div>
                        <textarea
                            className="text-area"
                            name="text-area"
                            onChange={this.storeDraftBio}
                            placeholder={this.props.bio}
                        ></textarea>
                        <button
                            onClick={this.sendOfficialBio}
                            className="btn-update-bio"
                        >
                            UPDATE BIO
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

// Now, this is the story all about how
// My life got flipped-turned upside down
// And I'd like to take a minute, just sit right there
// I'll tell you how I became the prince of a town called Bel Air
