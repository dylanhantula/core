import React, { useContext, useState } from "react";
import { AuthContext } from "../App/App";
import {updateProfile} from '../../api/api'

const submit = (vals, id) => {
    updateProfile(vals, id).catch(e => console.log(e));
}

const CoachProfile = () => {

    const {user} = useContext(AuthContext);
    const [elevPitch, setElevPitch] = useState("");
    const vals = {
        "elevatorPitch": elevPitch
    };
    
    const submitPitch = (e) => {
        e.preventDefault();
        submit(vals, user.firebaseUser.uid);
    }

    return (
        <div>
            <h1>Coach Profile</h1>
            <ul className="profileItems">
                <li>
                    First Name: {user.profile.firstName}
                </li>
                <li>
                    Last Name: {user.profile.lastName}
                </li>
                <li>
                    Email: {user.profile.email}
                </li>
                <li>
                    Sport: {user.profile.sport}
                </li>
                <li>
                    Why do you want to coach?: {user.profile.whyCoach}
                </li>
                <li>
                    Years of Experience: {user.profile.yearsExp}
                </li>
                <li>
                    Zip Code: {user.profile.zipCode}
                </li>
                <li>
                    Elevator Pitch: <form onSubmit={e => submitPitch(e)}>
                        <input onChange={e => setElevPitch(e.target.value)}></input>
                        <button type="submit">Submit Elevator Pitch</button>
                    </form>
                    <p>{user.profile.elevatorPitch}</p>

                </li>
            </ul>
        </div>
    );
};

export default CoachProfile;