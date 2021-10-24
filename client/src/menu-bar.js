import { Component } from "react";
import { Link } from "react-router-dom";

export class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.closeMenuFunction = this.closeMenuFunction.bind(this);
    }
    componentDidMount() {
        // console.log("MENU BAR  MOUNTED");
    }
    closeMenuFunction() {
        this.props.functionCloseMenuBar();
    }
    render() {
        // console.log("STATE on DID MOUNT>> ", this.state);
        console.log("PROPS on DID MOUNT>> ", this.props);
        return (
            <div
                className="menu-bar-container"
                onClick={this.closeMenuFunction}
            >
                <div className="link-navbar">
                    <Link to="/find-route">
                        <h6>FIND ROUTE |</h6>
                    </Link>
                </div>
                <div className="link-navbar">
                    <Link to="/routes">
                        <h6>ROUTES |</h6>
                    </Link>
                </div>
                <div className="link-navbar">
                    <Link to="/chat">
                        <h6>CHAT |</h6>
                    </Link>
                </div>
                <div className="link-navbar">
                    <Link to="/">
                        <h6>PROFILE |</h6>
                    </Link>
                </div>
                <div className="link-navbar">
                    <a href="/logout">
                        <h6>LOGOUT |</h6>
                    </a>
                </div>
            </div>
        );
    }
}
