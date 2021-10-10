import ProfilePic from "./profilepic";
import { BioEditor } from "./bio-editor";

export default function Profile(props) {
    console.log("props in PROFILE  ", props);
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
