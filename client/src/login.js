import { Component } from "react";
import { Link } from "react-router-dom";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "whoops, something went wrong. Please try again.",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount() {
        console.log("LOGIN MOUNTED");
        this.setState({
            error: false,
        });
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
    handleLogin(e) {
        e.preventDefault();
        console.log("login button works");
        console.log("this.state :>> ", this.state);
        console.log("this.state.error :>> ", this.state.error);
        fetch("/login", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (!resp.success) {
                    console.log("tut mir leid");
                    this.setState({
                        error: this.state.error,
                    });
                } else {
                    location.reload();
                    //  SPLICE URL
                    console.log("Richtig gutes Zeug");
                }
            });
    }
    render() {
        return (
            <div className="login-container">
                <section id="login">
                    {this.state.error && <h2>{this.state.error}</h2>}

                    <form className="login-registration">
                        <input
                            className="login-input"
                            type="email"
                            name="email"
                            placeholder="e@mail.com"
                            onChange={this.handleChange}
                            required
                        ></input>
                        <input
                            className="login-input"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this.handleChange}
                            required
                        ></input>

                        <button
                            className="btn-login"
                            onClick={this.handleLogin}
                        >
                            LOGIN
                        </button>
                    </form>
                </section>
                <Link to="/">Not registered? </Link>
            </div>
        );
    }
}
