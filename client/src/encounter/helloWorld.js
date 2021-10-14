import Greetee from "./greetee";
import Counter from "./counter";

export default function HelloWorld() {
    const name = "Matteo";
    return (
        <div className="prettyColor">
            <h1>Hello, World!</h1>
            {20 * 20}
            <h1>{name}</h1>
            <div>
                Hello <Greetee name={name} />
            </div>
            <div>
                Hello <Greetee name="Laura" />
            </div>
            <div>
                Hello <Greetee />
            </div>
            <div>
                
                <Counter />
            </div>
        </div>
    );
}
