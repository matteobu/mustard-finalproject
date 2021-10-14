import { Component } from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

export class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            step: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleStepOne = this.handleStepOne.bind(this);
        this.handleStepTwo = this.handleStepTwo.bind(this);
    }
    componentDidMount() {
        history.pushState({}, "", "/");
    }

    handleChange({ target }) {
        this.setState(
            {
                [target.name]: target.value,
            },
            () => {
                // console.log("registration update", this.state);
            }
        );
    }
    async handleStepOne(e) {
        e.preventDefault();
        const resp = await fetch("/reset-code", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => console.log(err));
        const data = await resp.json();
        if (!data.success) {
            this.setState({
                error: "whoops, something went wrong. Please try again.",
            });
        } else {
            this.setState({
                step: 2,
            });
            location.pathname.slice(location.pathname.length);
        }
    }

    async handleStepTwo(e) {
        e.preventDefault();
        const resp = await fetch("/reset-password", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => console.log(err));
        const data = await resp.json();
        if (!data.success) {
            // console.log("tut mir leid");
            this.setState({
                error: "whoops, something went wrong. Please try again.",
            });
        } else {
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    }

    
    render() {
        const step = this.state.step;
        return (
            <div className="reset-container">
                {step == 1 && (
                    <form className="reset-form">
                        <h3> please insert your email address</h3>
                        <input
                            className="reset-input"
                            type="email"
                            name="email"
                            placeholder="e@mail.com"
                            onChange={this.handleChange}
                            required
                        ></input>
                        <button
                            className="btn-send-code"
                            onClick={this.handleStepOne}
                        >
                            SEND CODE
                        </button>
                    </form>
                )}
                {step == 2 && (
                    <form className="reset-form">
                        <h3>
                            {" "}
                            please verify your code and insert a new password
                        </h3>

                        <input
                            className="reset-input"
                            type="text"
                            name="code"
                            placeholder="code"
                            onChange={this.handleChange}
                            required
                        ></input>
                        <input
                            className="reset-input"
                            type="password"
                            name="password"
                            placeholder="new password"
                            onChange={this.handleChange}
                            required
                        ></input>
                        <button
                            className="btn-send-code"
                            onClick={this.handleStepTwo}
                        >
                            SEND CODE
                        </button>
                    </form>
                )}
                <Link className="link-login" to="/login">
                    Wanna try login one more time?{" "}
                </Link>

                {/* <Link to="/">Not registered? </Link>
                <Link to="/reset">Forgot Password? </Link> */}
                <div className="error-message">
                    {this.state.error && <h2>{this.state.error}</h2>}
                </div>
            </div>
        );
    }
}
