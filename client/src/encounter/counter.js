import { Component } from "react";

export default class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            name: "",
        };
        // this.incrementCount = this.incrementCount.bind(this);
    }

    componentDidMount() {
        console.log("COUNTER MOUNTED");
    }
    incrementCount() {
        console.log("incrementing!");
        this.setState({
            count: this.state.count + 1,
        });
    }

    handleChange(e) {
        this.setState({
            name: e.target.value,
        });
        console.log("typing in input field");
    }
    render() {
        return (
            <div>
                <h1>Hi I am the Counter The count is {this.state.count}</h1>
                {/* <button onClick={this.incrementCount}> click me</button> */}
                <button onClick={() => this.incrementCount()}> click me</button>

                <input onChange={(e) => this.handleChange(e)}></input>
                <div>{this.state.name}</div>
            </div>
        );
    }
}
