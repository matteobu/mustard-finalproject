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
        // console.log("BIO MOUNTED");
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
                // console.log(resp);
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
        // console.log("this.state.show");
        // console.log("PROPS INSIDE BIO-EDITOR", this.props);
        this.setState((oldState) => ({
            showTextArea: !oldState.showTextArea,
            showBio: !oldState.showBio,
        }));
    }
    render() {
        // console.log("PROPS on RENDER BIO-EDITOR>> ", this.props);
        // console.log("STATE on RENDER BIO-EDITOR>> ", this.state);
        // console.log("RENDER ");
        return (
            <div>
                {this.state.showBio && (
                    <div>
                        <div className="my-bio">
                            <h3> my bio:</h3> {this.props.bio}
                        </div>

                        <button
                            onClick={this.openTextArea}
                            className="btn-update-bio"
                        >
                            UPDATE
                        </button>
                    </div>
                )}

                {this.state.showTextArea && (
                    <div>
                        {" "}
                        <div>
                            <textarea
                                className="text-area"
                                name="text-area"
                                onChange={this.storeDraftBio}
                                placeholder={this.props.bio}
                            ></textarea>
                        </div>
                        <div>
                            <button
                                onClick={this.sendOfficialBio}
                                className="btn-update-bio"
                            >
                                SUBMIT
                            </button>{" "}
                            <button
                                onClick={this.openTextArea}
                                className="btn-update-bio"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}