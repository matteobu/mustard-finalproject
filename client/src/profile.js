import ProfilePic from "./profilepic";
// import { BioEditor } from "./bio-editor";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Profile(props) {
    /// TOP LEVEL OF THE FUNCTION COMPONENT////
    // console.log("props in PROFILE  ", props);
    /// TOP LEVEL OF THE FUNCTION COMPONENT ////
    return (
        <div className="profile-container">
            <div className="profile-right-container">
                <h2>Hi! {props.first}</h2>
                <h1>
                    <BioEditor
                        className={props.picProfilebig}
                        imageUrl={props.imageUrl}
                        first={props.first}
                        last={props.last}
                        bio={props.bio}
                        storeBioInApp={props.storeBioInApp}
                    />
                </h1>
            </div>

            <div className="profile-container-pic">
                <div className="changepic">
                    <img
                        className="camera-icon"
                        src={props.cameraPic}
                        onClick={props.clickHandler}
                    ></img>
                </div>
                <ProfilePic
                    className={props.className}
                    imageUrl={props.imageUrl}
                    first={props.first}
                    last={props.last}
                />
            </div>
        </div>
    );
}
