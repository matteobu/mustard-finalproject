import { Component } from "react";
// import { Link } from "react-router-dom";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.handleUploadPic = this.handleUploadPic.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        // this.clickUploader = this.clickUploader.bind(this);
    }
    componentDidMount() {
        console.log("UPLOADER MOUNTED");

        this.setState({
            usersID: this.props.usersID,
        });
    }

    fileSelectHandler({ target }) {
        // console.log("input field name, something happend");
        // console.log("event object: >>", target.files[0]);

        this.setState(
            {
                [target.name]: target.files[0],
            },
            () => {
                // console.log("registration update", this.state);
                // console.log("JSON THIS STATE", JSON.stringify(this.state));
            }
        );
    }
    handleUploadPic(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.state.file);
        // console.log("this.state on HANDLE UPLOAD PIC", this.state);
        // console.log("this.state on HANDLE UPLOAD PIC", fd);
        fetch("/upload-pic", {
            method: "POST",
            body: fd,
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    // console.log("resp.success :>> ", resp.success);
                    // console.log("url from handleuploadpic :>> ", resp.url);
                    // console.log("THIS PROPS :>> ", );
                    this.props.functionUploadImage(resp.url);
                } else {
                    this.setState({
                        error: "whoops, something went wrong. Please try again.",
                    });
                }
            })
            .catch((err) => console.log("error in catch-post-uploadpic", err));
    }
    render() {
        console.log("STATE on DID MOUNT>> ", this.state);
        console.log("PROPS on RENDER UPLOADER>> ", this.props);
        return (
            <div className="uploader-container">
                <form className="form-input">
                    <input
                        type="file"
                        className="inputfile"
                        name="file"
                        accept="image/*"
                        onChange={this.fileSelectHandler}
                    ></input>

                    <button onClick={this.handleUploadPic} type="submit">
                        UPLOAD
                    </button>
                </form>
            </div>
        );
    }
}
