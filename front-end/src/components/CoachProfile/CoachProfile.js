import React, { useContext } from "react";
import { AuthContext } from "../App/App";

const CoachProfile = () => {
    
    const {user} = useContext(AuthContext);

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
            </ul>
        </div>
    );
};

export default CoachProfile;