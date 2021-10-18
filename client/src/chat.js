import { Component } from "react";
import { Link } from "react-router-dom";

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        // this.closeMenuFunction = this.closeMenuFunction.bind(this);
    }
    componentDidMount() {
        // console.log("MENU BAR  MOUNTED");
    }
    closeMenuFunction() {
        // this.props.functionCloseMenuBar();
    }
    render() {
        // console.log("STATE on DID MOUNT>> ", this.state);
        // console.log("PROPS on DID MOUNT>> ", this.props);
        return <div className="chat-reduced ">CHAT</div>;
    }
}
