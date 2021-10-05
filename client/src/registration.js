//CLASS COMPONENT
import { Component } from "react";
export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "whoops, something went wrong. Please try again.",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        console.log("REGISTRATION MOUNTED");
        this.setState({
            error: null,
        });
    }
    handleChange({ target }) {
        // console.log("input field name, something happend");
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

    handleRegister(e) {
        e.preventDefault();
        console.log("this.state", this.state);
        fetch("/registration", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    // a: user successfully registered --- sent to logged experience
                    // // in this case we want trigger the help of location.reload()
                    console.log("resp in then-post-registration", resp);
                    location.reload();
                } else {
                    // b: registration component  to render with an error
                    this.setState({
                        error: this.state.error,
                    });
                }
            })
            .catch((err) =>
                console.log("error in catch-post-registration", err)
            );
    }

    render() {
        return (
            <div className="registration-container">
                <h1> Registration</h1>
                {this.state.error && <h2>{this.state.error}</h2>}
                <form>
                    <input
                        type="text"
                        name="first"
                        placeholder="first name"
                        onChange={this.handleChange}
                    ></input>
                    <input
                        type="text"
                        name="last"
                        placeholder="last name"
                        onChange={this.handleChange}
                    ></input>
                    <input
                        type="email"
                        name="email"
                        placeholder="e@mail.com"
                        onChange={this.handleChange}
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    ></input>

                    <button onClick={this.handleRegister}>REGISTER</button>
                </form>
            </div>
        );
    }
}
