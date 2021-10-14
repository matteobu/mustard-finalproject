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
        this.setState(
            {
                draftBio: target.value,
            },
            () => {}
        );
    }
    async sendOfficialBio() {
        const result = await fetch("/update-bio", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => console.log(err));
        const resp = await result.json();
        if (resp.success) {
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
    }

    openTextArea() {
        this.setState((oldState) => ({
            showTextArea: !oldState.showTextArea,
            showBio: !oldState.showBio,
        }));
    }
    render() {
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

// FUNCTION OLD CODE sendOfficialBio

// fetch("/update-bio", {
//     method: "POST",
//     body: JSON.stringify(this.state),
//     headers: {
//         "Content-Type": "application/json",
//     },
// })
//     .then((resp) => resp.json())
//     .then((resp) => {
//         // console.log(resp);
//         if (resp.success) {
//             // console.log("resp.success :>> ", resp.success);
//             // console.log("url from handleuploadpic :>> ", resp.url);
//             // console.log("THIS PROPS :>> ", );
//             this.setState((oldState) => ({
//                 showTextArea: !oldState.showTextArea,
//                 showBio: !oldState.showBio,
//             }));
//             this.props.storeBioInApp(this.state.draftBio);
//         } else {
//             this.setState({
//                 error: "whoops, something went wrong. Please try again.",
//             });
//         }
//     })
//     .catch((err) => console.log("error in catch-post-uploadpic", err));
