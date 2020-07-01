import React, { useContext, useState } from "react";
import { AuthContext } from "../App/App";
import {updateProfile} from '../../api/api';
import CoachProfileHeader from "../CoachProfileHeader/CoachProfileHeader";
import CoachProfileBackground from "../CoachProfileBackground/CoachProfileBackground";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CoachPublicProfile from "../CoachPublicProfile.js/CoachPublicProfile";

function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
  }
  
const CoachProfile = () => {

    const submit = (vals, id) => {
        updateProfile(vals, id)
            .then(response => {
                for (const field in response) {
                    setStateFunctions[field](response[field]);
                }
                setOpenSnackBar(true);
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
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [fullTime, setFullTime] = useState(user.profile.fullTime);
    const [playingExp, setPlayingExp] = useState(user.profile.playingExp);
    const [viewPublic, setViewPublic] = useState(false);

 
    const setStateFunctions = {
        "elevPitch": setElevPitch,
        "profileField1": setProfileField1, 
        "profileField2": setProfileField2, 
        "profileField3": setProfileField3, 
        "profileField4": setProfileField4, 
        "profileField5": setProfileField5, 
        "profileField6": setProfileField6,
        "playingExp": setPlayingExp,
        "fullTime": setFullTime
    };

    const profileBackgroundStates = {
        "profileField1": profileField1, 
        "profileField2": profileField2, 
        "profileField3": profileField3, 
        "profileField4": profileField4, 
        "profileField5": profileField5, 
        "profileField6": profileField6,
        "playingExp": playingExp,
        "fullTime": fullTime 
    };
    
    
    const submitChanges = (e) => {
        e.preventDefault();
        submit(values, user.firebaseUser.uid);
    }

    let profileToDisplay;
    if (viewPublic) {
        profileToDisplay = 
        (<div>
            <CoachPublicProfile
                public={viewPublic}
                setPublic={setViewPublic}
                firstName={user.profile.firstName} 
                lastName={user.profile.lastName} 
                zipCode={user.profile.zipCode}
                sport={user.profile.sport}
                AUScore={user.profile.AUScore}
                pitch={elevPitch}
                background={profileBackgroundStates}/>
        </div>);
    } else {
        profileToDisplay = 
       (<div>
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
                public={viewPublic}
                setPublic={setViewPublic}
            />
            <CoachProfileBackground 
                stateFunctions={setStateFunctions}
                uploadVals={values}
                states={profileBackgroundStates}
                setUploadVals={setValues}
                submit={submitChanges} 
            />

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={e => setOpenSnackBar(false)}>
                <Alert onClose={e => setOpenSnackBar(false)} severity="success">
                    Saved Successfuly!
                </Alert>
            </Snackbar>
        </div>);
    }

    return (
        <div>
        {profileToDisplay}
        </div>
    );
};

export default CoachProfile;