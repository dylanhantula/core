import React, { useContext, useState } from "react";
import { AuthContext } from "../App/App";
import {updateProfile} from '../../api/api'



const CoachProfile = () => {
    const submit = (vals, id) => {
        updateProfile(vals, id)
            .then(response => {
                for (const field in response) {
                    setStateFunctions[field](response[field]);
                }
                console.log(response);
            })
            .catch(e => console.log(e));
    }

    const {user} = useContext(AuthContext);
    const [values, setValues] = useState({});
    const [elevPitch, setElevPitch] = useState(user.profile.elevPitch);
    const [, setProfileField1] = useState(user.profile.profileField1);
    const [, setProfileField2] = useState(user.profile.profileField2);
    const [, setProfileField3] = useState(user.profile.profileField3);
    const [, setProfileField4] = useState(user.profile.profileField4);
    const [, setProfileField5] = useState(user.profile.profileField5);
    const [, setProfileField6] = useState(user.profile.profileField6);

 
    const setStateFunctions = {
        "elevPitch": setElevPitch,
        "profileField1": setProfileField1, 
        "profileField2": setProfileField2, 
        "profileField3": setProfileField3, 
        "profileField4": setProfileField4, 
        "profileField5": setProfileField5, 
        "profileField6": setProfileField6 
    };
    
    
    const submitPitch = (e) => {
        e.preventDefault();
        submit(values, user.firebaseUser.uid);
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
                        <input onChange={e => {setElevPitch(e.target.value); setValues({
                            ...values,
                            "elevPitch": e.target.value
                        });}}></input>
                        <button type="submit">Submit Elevator Pitch</button>
                    </form>
                    <p>{elevPitch}</p>

                </li>
                <li>
                    Background
                    <form onSubmit={e => submitPitch(e)}>
                        <input onChange={e => {setProfileField1(e.target.value); setValues({
                            ...values,
                            "profileField1": e.target.value
                            });}}>
                        </input>
                        <input onChange={e => {setProfileField2(e.target.value); setValues({
                            ...values,
                            "profileField2": e.target.value
                            });}}>
                        </input>
                        <input onChange={e => {setProfileField3(e.target.value); setValues({
                            ...values,
                            "profileField3": e.target.value
                            });}}>
                        </input>
                        <input onChange={e => {setProfileField4(e.target.value); setValues({
                            ...values,
                            "profileField4": e.target.value
                            });}}>
                        </input>
                        <input onChange={e => {setProfileField5(e.target.value); setValues({
                            ...values,
                            "profileField5": e.target.value
                            });}}>
                        </input>
                        <input onChange={e => {setProfileField6(e.target.value); setValues({
                            ...values,
                            "profileField6": e.target.value
                            });}}>
                        </input>
                        <button type="submit">Save</button>
                    </form>
                </li>
            </ul>
        </div>
    );
};

export default CoachProfile;