import React, { useContext, useEffect } from "react";
import { AuthContext } from "../App/App";
import { createCustomer } from "../../api/api";



const AthleteProfile = () => {
    
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const data = {
            'athlete': user.profile,
            'athleteID': user.firebaseUser.uid
        };
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            createCustomer(idToken, data)
            .then(response => {
                console.log(response)
            })
            .catch(e => console.log(e));
        });
    });

    return (
        <div>
            <h1>Athlete Profile</h1>
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
                    Current Team: {user.profile.currentTeam}
                </li>
                <li>
                    Years of Experience: {user.profile.yearsExp}
                </li>
                <li>
                    Zip Code: {user.profile.zipCode}
                </li>
            </ul>
            
        </div>
    );
};

export default AthleteProfile;