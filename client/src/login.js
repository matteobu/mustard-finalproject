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
        this.setState({
            error: false,
        });
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
    async handleLogin(e) {
        e.preventDefault();
        const result = await fetch("/login", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => console.log(err));
        const data = await result.json();

        if (!data.success) {
            this.setState({
                error: "whoops, something went wrong. Please try again.",
            });
        } else {
            location.replace("/");
        }
    }
    render() {
        return (
            <div className="login-container">
                <section id="login">
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
                    <Link className="link-login" to="/">
                        Not registered?{" "}
                    </Link>
                    <Link className="link-login" to="/reset">
                        Forgot Password?{" "}
                    </Link>
                    <div className="error-message">
                        {this.state.error && <h2>{this.state.error}</h2>}
                    </div>
                </section>
            </div>
        );
    }
}
