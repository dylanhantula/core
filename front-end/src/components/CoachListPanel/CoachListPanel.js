import React from 'react';
import blank_avatar from '../CoachProfile/avatar.png';
import './CoachListPanel.css';

const CoachListPanel = (props) => {
    return (
    <div className="CoachListPanelContainer">
        <div>
            <img src={blank_avatar} alt="Profile_Avatar" className="CoachListPanelAvatar"/>
            <p className="CoachListPanelBold" style={{textAlign: 'center'}}>{props.coach.firstName} {props.coach.lastName}</p>
        </div>
        <div className="CoachListPanelInfo">
            <p className="CoachListPanelBold">{props.coach.sport.slice(0,1).toUpperCase() + props.coach.sport.slice(1)}</p>
            <p className="CoachListPanelItalic">{props.coach.distance} miles away</p>
            <p className="CoachListPanelBold">Highest Playing Level</p>
            <p className="CoachListPanelNormal">{props.coach.playingExp}</p>
            <button className="viewProfileButtonCoachListPanel" style={{margin: '1rem 0rem'}} onClick={e => props.onClickViewProfile(props.coach)}>View Profile</button>
        </div>
        <div>
            <p className="CoachListPanelBold">About the Coach</p>
            <p className="CoachListPanelNormal">{props.coach.elevPitch}</p>
        </div>
        <div className="CoachListPanelMoney">
            <p className="CoachListPanelNormal">First Session Price</p>
            <p className="CoachListPanelNormal">Packages Available</p>
            <p className="CoachListPanelNormal">Training Since {2020 - props.coach.yearsExp}</p>
            <div>
                <button className="viewProfileButtonCoachListPanel">Book a Session</button>
                <button>Message Coach</button>
            </div>
            
        </div>
    </div>);
}

export default CoachListPanel;