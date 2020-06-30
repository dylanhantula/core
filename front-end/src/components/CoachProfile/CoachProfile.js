import React, { useContext, useState } from "react";
import { AuthContext } from "../App/App";
import {updateProfile} from '../../api/api';
import CoachProfileHeader from "../CoachProfileHeader/CoachProfileHeader";
import CoachProfileBackground from "../CoachProfileBackground/CoachProfileBackground";



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
    const [profileField1, setProfileField1] = useState(user.profile.profileField1);
    const [profileField2, setProfileField2] = useState(user.profile.profileField2);
    const [profileField3, setProfileField3] = useState(user.profile.profileField3);
    const [profileField4, setProfileField4] = useState(user.profile.profileField4);
    const [profileField5, setProfileField5] = useState(user.profile.profileField5);
    const [profileField6, setProfileField6] = useState(user.profile.profileField6);

 
    const setStateFunctions = {
        "elevPitch": setElevPitch,
        "profileField1": setProfileField1, 
        "profileField2": setProfileField2, 
        "profileField3": setProfileField3, 
        "profileField4": setProfileField4, 
        "profileField5": setProfileField5, 
        "profileField6": setProfileField6 
    };

    const profileBackgroundStates = {
        "profileField1": profileField1, 
        "profileField2": profileField2, 
        "profileField3": profileField3, 
        "profileField4": profileField4, 
        "profileField5": profileField5, 
        "profileField6": profileField6 
    };
    
    
    const submitChanges = (e) => {
        e.preventDefault();
        submit(values, user.firebaseUser.uid);
    }

    return (
        <div>
            <h1>Coach Profile</h1>
            <CoachProfileHeader 
                firstName={user.profile.firstName} 
                lastName={user.profile.lastName} 
                zipCode={user.profile.zipCode}
                sport={user.profile.sport}
                AUScore={user.profile.AUScore}
                stateFunctions={setStateFunctions}
                uploadVals={values}
                pitch={elevPitch}
                setUploadVals={setValues}
                submit={submitChanges} 
            />
            <CoachProfileBackground 
                stateFunctions={setStateFunctions}
                uploadVals={values}
                states={profileBackgroundStates}
                setUploadVals={setValues}
                submit={submitChanges} 
            />
            
        </div>
    );
};

export default CoachProfile;