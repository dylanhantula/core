import React from 'react';
import blank_avatar from '../CoachProfile/avatar.png';
import './CoachProfileHeader.css';

const CoachProfileHeader = (props) => {
    return (
        <div className="coachProfileHeaderContainer">
            <img src={blank_avatar} alt="Blank Avatar" className="coachProfileHeaderAvatar"></img>
            <div className="coachProfileHeaderDynamicInfo">
                <p>{props.firstName} {props.lastName}</p>
                <div className="coachProfileHeaderReviewsAndAUScore">
                    <p></p>
                    <p>{props.AUScore}</p>
                </div>
                <p>{props.zipCode}</p>
                <p>Private {props.sport} Coach</p>
                <textarea value={props.pitch} onChange={e => {props.stateFunctions["elevPitch"](e.target.value); props.setUploadVals({
                            ...props.uploadVals,
                            "elevPitch": e.target.value
                        });}}></textarea>
                <p onClick={e => props.submit(e)}>Save Elevator Pitch</p>
            </div>
            <p></p>
        </div>
    );
}

export default CoachProfileHeader;