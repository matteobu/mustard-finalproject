import { Component } from "react";
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
    }
    componentDidMount() {
        console.log("RESET MOUNTED");
        // this.setState({
        //     error: false,
        // });
    }

    handleChange({ target }) {
        console.log("input field name, something happend");
        // console.log("event object: >>", e);
        // console.log("event object: >>", target.name);
        // console.log("event object: >>", target.value);
        // add the values to the component's state
        this.setState(
            {
                [target.name]: target.value,
            },
            () => {
                // console.log("registration update", this.state);
            }
        );
    }
    handleStepOne(e) {
        e.preventDefault();
        console.log("login button works");
        console.log("this.state :>> ", this.state);
        console.log("this.state.error :>> ", this.state.error);
        fetch("/reset", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                // if (!resp.success) {
                //     console.log("tut mir leid");
                //     this.setState({
                //         error: "whoops, something went wrong. Please try again.",
                //     });
                // } else {
                //     location.reload();
                //     //  SPLICE URL
                //     console.log("Richtig gutes Zeug");
                // }
            });
    }
    render() {
        const step = this.state.step;
        return (
            <div className="reset-container">
                <img
                    className="logo-container-center"
                    src="/img/no-logo-long-BPw.png"
                    alt="logo"
                />

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
                    <form className="login-registration">
                        <input
                            className="reset-input"
                            type="email"
                            name="email"
                            placeholder="e@mail.com"
                            onChange={this.handleChange}
                            required
                        ></input>
                        <input
                            className="reset-input"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this.handleChange}
                            required
                        ></input>
                        <button
                            className="btn-send-code"
                            onClick={this.handleLogin}
                        >
                            UPDATE PASSWORD
                        </button>
                    </form>
                )}

                {/* <Link to="/">Not registered? </Link>
                <Link to="/reset">Forgot Password? </Link> */}
                <div className="error-message">
                    {this.state.error && <h2>{this.state.error}</h2>}
                </div>
            </div>
        );
    }
}
