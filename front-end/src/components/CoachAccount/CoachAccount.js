import React, { useState, useContext } from 'react';
import './CoachAccount.css';
import AULogo from './Athletes-Untapped-Logo-Rectangle.png';
import { AuthContext } from "../App/App";
import { updateProfile } from '../../api/api';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
  }

const CoachAccount = (props) => {
    const {user} = useContext(AuthContext);

    const [firstName, setFirstName] = useState(user.profile.firstName);
    const [lastName, setLastName] = useState(user.profile.lastName);
    const [sport, setSport] = useState(user.profile.sport);
    const [zipCode, setZipCode] = useState(user.profile.zipCode);
    const [newVals, setNewVals] = useState({});
    const [openSnackbar, setOpenSnackBar] = useState(false);


    const setStateFunctions = {
        "firstName": setFirstName,
        "lastName": setLastName, 
        "sport": setSport, 
        "zipCode": setZipCode, 
    };

    const submitChanges = (e) => {
        e.preventDefault();
        submit(newVals, user.firebaseUser.uid);
    }

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

    return (
        <div className="CoachAccountContainer">
            <div className="CoachAccountImageContainer">
                <img src={AULogo} alt="Athletes Untapped"></img>
            </div>
            <div className="CoachAccountTitleContainer">
                <p>General Account Settings</p>
            </div>
            <div className="CoachAccountContentContainer">
                <div>
                    <p>First Name:</p>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={e => {
                            setFirstName(e.target.value); 
                            setNewVals({...newVals, "firstName": e.target.value});
                            }}>
                    </input>
                </div>
                <div>
                    <p>Last Name:</p>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={e => {
                            setLastName(e.target.value); 
                            setNewVals({...newVals, "lastName": e.target.value});
                            }}>
                    </input>
                </div>
                <div>
                    <p>Sport(s):</p>
                    <input 
                        type="text" 
                        value={sport} 
                        onChange={e => {
                            setSport(e.target.value); 
                            setNewVals({...newVals, "sport": e.target.value.toLowerCase()});
                            }}>
                    </input>
                </div>
                <div>
                    <p>Zip Code:</p>
                    <input 
                        type="text" 
                        value={zipCode} 
                        onChange={e => {
                            setZipCode(e.target.value); 
                            setNewVals({...newVals, "zipCode": e.target.value});
                            }}>
                    </input>
                </div>
            </div>
            <div className="CoachAccountButtonContainer">
                <p>Go to Payment Settings</p>
                <button onClick={e => submitChanges(e)}>Save</button>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={e => setOpenSnackBar(false)}>
                <Alert onClose={e => setOpenSnackBar(false)} severity="success">
                    Saved Successfuly!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CoachAccount;