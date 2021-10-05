// FUNCTION COMPONENT
import { Registration } from "./registration";

export default function Welcome() {
    return (
        //  REACT FRAGMENT
        <div div className="main-container">
            <div className="navbar">
                <img className="logo" src="/logoB.png" alt="logo" />
            </div>
            <h1> WELCOME TO MY BEAUTIFUL SOCIAL NETWORK</h1>
            <div>
                <Registration />
            </div>
            <footer>©2021, ride fast die last</footer>
        </div>
    );
}
