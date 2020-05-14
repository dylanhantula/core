import React, { useContext } from "react";
import { AuthContext } from "../App/App";

const AthleteProfile = () => {
    
    const {user} = useContext(AuthContext);

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