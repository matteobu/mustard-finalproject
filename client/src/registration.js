//CLASS COMPONENT
import { Component } from "react";
import { Link } from "react-router-dom";

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        // console.log("REGISTRATION MOUNTED");
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

    async handleRegister(e) {
        e.preventDefault();
        const resp = await fetch("/registration", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => console.log(err));
        const data = await resp.json();
        if (data.success) {
            this.setState({ userId: data.userId });

            location.reload();
        } else {
            this.setState({
                error: "whoops, something went wrong. Please try again.",
            });
        }
    }

    render() {
        return (
            <div className="right-registration">
                <form className="form-registration">
                    <input
                        type="text"
                        name="first"
                        placeholder="first name"
                        onChange={this.handleChange}
                        required
                    ></input>
                    <input
                        type="text"
                        name="last"
                        placeholder="last name"
                        onChange={this.handleChange}
                        required
                    ></input>
                    <input
                        type="email"
                        name="email"
                        placeholder="e@mail.com"
                        onChange={this.handleChange}
                        required
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                        required
                    ></input>

                    <button
                        className="btn-register"
                        onClick={this.handleRegister}
                    >
                        REGISTER
                    </button>
                    <Link to="/login">Already registered? </Link>
                    <div className="error-message">
                        {this.state.error && <h2>{this.state.error}</h2>}
                    </div>
                </form>
            </div>
        );
    }
}
