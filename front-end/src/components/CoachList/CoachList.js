import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import * as qs from 'query-string';
import {getCoaches} from '../../api/api'
import './CoachList.css';
import BottomNav from "../BottomNav/BottomNav";
import CoachListPanel from "../CoachListPanel/CoachListPanel";
import CoachPublicProfile from "../CoachPublicProfile.js/CoachPublicProfile";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AthleteMessageCoach from "../AthleteMessageCoach/AthleteMessageCoach";

function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
  }

const CoachList = ( props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const [error, setError] = useState("");
    const [coaches, setCoaches] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showCoachProfile, setShowCoachProfile] = useState(false);
    const [coachToShow, setCoachToShow] = useState({});
    const [zip, setZip] = useState("");
    const [sport, setSport] = useState("");
    const [queryParams, setQueryParams] = useState(qs.parse(props.location.search));
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [showMessageCoach, setShowMessageCoach] = useState(false);

    
    

    useEffect(() => {

        // Required so that the useEffect logic does not try to change state if the
        // component is unmounted. See https://juliangaramendy.dev/use-promise-subscription/
        let isSubscribed = true

        getCoaches(queryParams['zip'], queryParams['radius'], queryParams['sport'])
        .then(res => {
            if (isSubscribed) {

                if (res.coaches.length === 0) {
                    setError("No coaches found for the given parameters")
                    setOpenSnackBar(true);
                } else {
                    setCoaches(res.coaches);
                    console.log(res);
                }
                
                setIsLoaded(true);
            }
        })
        .catch(function(error) {
            if (isSubscribed) {
                console.log(error)
                setError(JSON.stringify(error))
                
                setIsLoaded(true);
            }
        isSubscribed = false
        });
               
        return () => isSubscribed = false
    }, [queryParams]);

    const searchHandler = e => {
        e.preventDefault();
        setQueryParams(qs.parse('?zip='+zip+'&sport='+sport+'&radius=5'));
        
    };


    
    const showProfileHandler = (coach) => {
        setShowCoachProfile(true);
        setShowMessageCoach(false);
        setCoachToShow(coach);
    }
    const showMessageCoachHandler = (coach) => {
        setShowMessageCoach(true);
        setShowCoachProfile(false);
        setCoachToShow(coach);
    }

    let screenToDisplay;
    if (showCoachProfile) {
        screenToDisplay = 
            <div>
                <CoachPublicProfile 
                    public={showCoachProfile}
                    setPublic={setShowCoachProfile}
                    displayMessage={showMessageCoach}
                    setDisplayMessage={setShowMessageCoach}
                    firstName={coachToShow.firstName} 
                    lastName={coachToShow.lastName} 
                    zipCode={coachToShow.zipCode}
                    sport={coachToShow.sport}
                    AUScore={coachToShow.AUScore}
                    pitch={coachToShow.elevPitch}
                    background={{
                        "profileField1": coachToShow.profileField1, 
                        "profileField2": coachToShow.profileField2, 
                        "profileField3": coachToShow.profileField3, 
                        "profileField4": coachToShow.profileField4, 
                        "profileField5": coachToShow.profileField5, 
                        "profileField6": coachToShow.profileField6,
                        "playingExp": coachToShow.playingExp,
                        "fullTime": coachToShow.fullTime
                    }}
                />
                <BottomNav/>
            </div>;
    } else if (showMessageCoach) {
        screenToDisplay = <div>
            <AthleteMessageCoach
                coach={coachToShow}
                displayMessage={showMessageCoach}
                setDisplayMessage={setShowMessageCoach}
                showProfile={showCoachProfile}
                setShowProfile={setShowCoachProfile}
            />
        </div>;
    } else {
        screenToDisplay = 
            <div>
                <div className="CoachListHeader">
                    <p>Your Coaches for {queryParams['sport'].slice(0,1).toUpperCase()+queryParams['sport'].slice(1)}</p>
                    <p>Zip Code: {queryParams['zip']}</p>
                </div>
                <div className="CoachListSearch">
                    <input type="text" name="Sport" placeholder="Sport" onChange={e => setSport(e.target.value)}></input>
                    <input type="text" name="Zip Code" placeholder="Zip Code" onChange={e => setZip(e.target.value)}></input>
                    <button className="CoachListButtonSearch" onClick={e => searchHandler(e)}>Search</button>
                </div>
                <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={e => setOpenSnackBar(false)}>
                <Alert onClose={e => setOpenSnackBar(false)} severity="error">
                    {error}
                </Alert>
                </Snackbar>
                <div className="greenBoxRankingList">
                {coaches.map((item, i) => (
                    <CoachListPanel key={i}
                    coach={item}
                    onClickViewProfile={showProfileHandler}
                    onClickMessageCoach={showMessageCoachHandler}
                    />
                ))}
                </div>
                <BottomNav/>
            </div>;
    }

    if (!isLoaded) {
        return(<div>Loading...</div>)
    } else {
        return (
            <div>
              {screenToDisplay}
            </div>
          );
    }
};

export default withRouter(CoachList);