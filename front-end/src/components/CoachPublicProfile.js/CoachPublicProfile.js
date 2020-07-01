import React from 'react';
import './CoachPublicProfile.css';
import '../CoachProfileHeader/CoachProfileHeader.css';
import blank_avatar from '../CoachProfile/avatar.png';

const CoachPublicProfile = (props) => {
    return (
        <div>
            <div>
                <div className="goBackToPrivateView">
                    <p onClick={e => props.setPublic(false)} className="viewPrivate">Go Back to Private View</p>
                </div>
                <div className="coachProfilePublicHeaderContainer">
                    <div className="coachProfilePublicImageContainer">
                        <img src={blank_avatar} alt="Blank Avatar" className="coachProfilePublicHeaderAvatar"></img>
                        <p>{props.firstName} is Insured/Not</p>
                    </div>
                    <div className="coachProfilePublicHeaderDynamicInfo">
                        <p>{props.firstName} {props.lastName}</p>
                        <div className="coachProfilePublicHeaderReviewsAndAUScore">
                            <p></p>
                            <p>{props.AUScore}</p>
                        </div>
                        <p>{props.zipCode}</p>
                        <p>Private {props.sport} Coach</p>
                        <p style={{height: '7rem'}}>{props.pitch}</p>
                        <div className="coachProfilePublicHeaderEnd">
                        <button className="messageCoachButton">Message Coach</button>
                        <button className="bookSessionButton">Book a Session</button>
                        </div>
                    </div>  
                </div>          
            </div>
            <div className="coachProfilePublicBackground">
                <div className="coachProfilePublicBackgroundAthletic">
                    <div className="coachProfilePublicBackgroundAthleticHeader">
                        <p>Athletic Background</p>
                    </div>
                    <div className="coachProfilePublicBackgroundAthleticContent">
                        <div>
                            <div>
                            <p>Highest Playing Level</p> </div>
                            <p> {props.background["playingExp"]}</p>
                        </div>
                        <div>
                            <p>Summary of Career and Accomplishments</p>
                            <p>{props.background["profileField1"]}</p>    
                        </div>
                        <div>
                            <p>Who is the best coach you ever had and why?</p>
                            <p>{props.background["profileField2"]}</p>    
                        </div>
                        <div>
                            <p>What should athletes and parents know about you?</p>
                            <p>{props.background["profileField3"]}</p>    
                        </div>

                    </div>
                </div>
                <div className="coachProfilePublicBackgroundAthletic">
                    <div className="coachProfilePublicBackgroundAthleticHeader">
                        <p>Coaching Background</p>
                    </div>
                    <div className="coachProfilePublicBackgroundAthleticContent">
                        <div>
                            <div>
                            <p>Is coaching your full-time job?</p> </div>
                            <p> {props.background["fullTime"]}</p>
                        </div>
                        <div>
                            <p>Summary of Coaching Background</p>
                            <p>{props.background["profileField4"]}</p>    
                        </div>
                        <div>
                            <p>How can you help someone improve their game?</p>
                            <p>{props.background["profileField5"]}</p>    
                        </div>
                        <div>
                            <p>What does a typical training session look like?</p>
                            <p>{props.background["profileField6"]}</p>    
                        </div>

                    </div>
                </div>
                <div className="coachProfilePublicBackgroundAthleticContentButtons">
                        <button className="messageCoachButton">Message Coach</button>
                        <button className="bookSessionButton">Book a Session</button>
                </div>
            </div>
        </div>
    );
}

export default CoachPublicProfile;