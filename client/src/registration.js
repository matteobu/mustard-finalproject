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
        e.preventDefault(); // PREVENT REFRESH
        // console.log(this.state);
        fetch("/registration.json", {
            method: "POST",
            headers: {
                "Content-TYpe": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log("error in then-post-registration", resp);
                // now we want
                // a: user successfully registered --- sent to logged experience
                // // in this case we want trigger the help of location.reload()

                // b: registration component  to render with an error
            })
            .catch((err) =>
                console.log("error in catch-post-registration", err)
            );
    }

    render() {
        return (
            <div>
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
