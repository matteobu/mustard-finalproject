// FUNCTION COMPONENT
import { Registration } from "./registration";
import { Login } from "./login";
import { Reset } from "./reset";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export default function Main() {
    return (
        //  REACT FRAGMENT
        <BrowserRouter>
            <div className="body-container">
                <div className="navbar">
                    <Link to="/">
                        <img
                            className="logo"
                            src="/img/logo/logo-small.png"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="central-container">
                    <div className="left-registration">
                        <div className="route-profile-container">
                            <div>
                                {" "}
                                <img
                                    className="logo-container"
                                    src="/img/logo/logo-home.png"
                                    alt="logo"
                                />
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route path="/reset">
                            <Reset />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                    </Switch>
                </div>
                <footer>©2021. BIKEPACKING IRGENDWO</footer>
            </div>
        </BrowserRouter>
    );
}

// export default function RouteProfile(props) {
//     console.log(`props`, props);
//     const routesProfileData = useSelector((state) => state.routes);
//     const { routeID } = useParams();
//     // console.log(`routesProfileData`, routesProfileData);

//     useEffect(() => {
//         let abort = false;
//         // console.log(`routeID`, routeID);
//         if (!abort) {
//             socket.emit("route-profile", routeID);
//             // console.log(`routesProfileData`, routesProfileData);
//         }
//         return () => {
//             // console.log("cleanup function");
//             abort = true;
//         };
//     }, []);
//     // const handleButton = () => {
//     //     // IF ELSE STATEMENT
//     //     if (privateChat) {
//     //         setPrivateChat(false);
//     //     } else setPrivateChat(true);
//     // };

//     return (
//         <>
//             <div className="route-profile-container">
//                 <div>THIS WILL BE THE HOME PAGE</div>
//             </div>
//         </>
//     );
// }
