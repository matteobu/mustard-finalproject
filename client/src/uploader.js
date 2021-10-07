// If you need it to change what it shows while it is onscreen,
// then it will need state and will have to be a class component

// * It needs a file input but not much else

// * You can upload the image as soon as the change event happens to the file input
// indicating that the user has selected a file.
// You would have to create a `FormData` object and `append` to it the `files[0]` of the event target.
// You would need to POST with fetch to a route just like the one in your image board project except,
// rather than adding a row to an images table, it should update the image url column in the users table.
// This POST route should send a JSON response containing the url of the image.

// * The one thing that the uploader component cannot do,
// is directly change the state of the `App` after the upload is complete to have the url of the new image.
// For `Uploader` to make the new image url be set in `App`'s state,
// it will have to call a function that was passed to it as a prop by `App`.
// This function should expect to receive a n image url as an argument.

import { Component } from "react";
// import { Link } from "react-router-dom";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleUploadPic = this.handleUploadPic.bind(this);
    }
    componentDidMount() {
        console.log("UPLOADER MOUNTED");
        this.setState({
            usersID: this.props.usersID,
        });
        // console.log("this.state on UPLOAD/MOUNT:>> ", this.state);
    }
    // handleChange({ target }) {
    //     // console.log("input field name, something happend");
    // }
    // handleLogin(e) {}

    handleUploadPic(e) {
        e.preventDefault();
        console.log("this.state on HANDLEUPLOADPIC", this.state);
        fetch("/upload-pic", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                // if (resp.success) {
                //     this.setState({ userId: resp.userId });
                //     // a: user successfully registered --- sent to logged experience
                //     // // in this case we want trigger the help of location.reload()
                //     // console.log("resp in then-post-registration", resp);
                //     location.reload();
                // } else {
                //     // b: registration component  to render with an error
                //     this.setState({
                //         error: "whoops, something went wrong. Please try again.",
                //     });
                // }
            })
            .catch((err) =>
                console.log("error in catch-post-registration", err)
            );
    }
    render() {
        // console.log("usersID on RENDER UPLOAD>> ", this.props.usersID);

        return (
            <div className="uploader-container">
                <button className="btn-upload" onClick={this.handleUploadPic}>
                    UPLOAD
                </button>{" "}
            </div>
        );
    }
}
