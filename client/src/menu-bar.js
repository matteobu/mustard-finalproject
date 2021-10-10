import { Component } from "react";
// import { Link } from "react-router-dom";

export class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        // this.handleUploadPic = this.handleUploadPic.bind(this);
        // this.fileSelectHandler = this.fileSelectHandler.bind(this);
        // this.clickUploader = this.clickUploader.bind(this);
    }
    componentDidMount() {
        // console.log("MENU BAR  MOUNTED");
        // this.setState({
        //     usersID: this.props.usersID,
        // });
    }

   
    render() {
        // console.log("STATE on DID MOUNT>> ", this.state);
        // console.log("PROPS on DID MOUNT>> ", this.props);
        return (
            <div className="menu-bar-container">
                <div className="link-navbar">
                    <h6>FIND BIKERZ |</h6>
                </div>
                <div className="link-navbar">
                    <h6>FRIENDS |</h6>
                </div>
                <div className="link-navbar">
                    <h6>CHAT |</h6>
                </div>
                <div className="link-navbar">
                    <h6>PROFILE |</h6>
                </div>
                <div className="link-navbar">
                    <h6>LOGOUT |</h6>
                </div>
              
            </div>
        );
    }
}
