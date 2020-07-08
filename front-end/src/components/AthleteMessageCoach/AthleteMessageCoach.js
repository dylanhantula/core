import React, { useState, useContext } from 'react';
import { AuthContext } from "../App/App";
import { createMessage } from '../../api/api';
import './AthleteMessageCoach.css';
import blank_avatar from './avatar.png';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: 'lightseagreen',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana sans-serif',
      color: 'gray'
    },
    details: {
        color: 'black',
        fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana sans-serif',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
  }));

const AthleteMessageCoach = (props) => {
    const {user} = useContext(AuthContext); 
    const expansionPanelClasses = useStyles();
    const [messageContent, setMessageContent] = useState("");
    const [openSnackbar, setOpenSnackBar] = useState(false);

    const sendMessage = (coach) => {
        const messageToSend = {
            "to": props.coach.firebaseID,
            "from": user.firebaseUser.uid,
            "content": messageContent
        }
        createMessage(messageToSend)
            .then(response => {
                setOpenSnackBar(true);
            })
            .catch(e => console.log(e));
    }

    return (
        <div className="AthleteMessageCoachContainer">
            <div className="AthleteMessageCoachMessageContainer">
                <div className="AthleteMessageCoachMessageHeader">
                    <div>
                        <p>{props.coach.firstName} {props.coach.lastName}</p>
                        <p>{props.coach.zipCode}</p>
                        <p>Private {props.coach.sport.slice(0,1).toUpperCase()+props.coach.sport.slice(1)} Coach </p>
                    </div>
                    <img src={blank_avatar} alt="BlankAvatar" className="AthleteMessageCoachAvatar"/>
                </div>
                <div className="AthleteMessageCoachMessageBody">
                    <p className="AthleteMessageCoachMessageBodyTitle">What to Expect from Working with Coach {props.coach.firstName}</p>
                    <ExpansionPanel>
                        <ExpansionPanelSummary 
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={expansionPanelClasses.root}>
                                <Typography className={expansionPanelClasses.heading}>What will a typical training session look like?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography className={expansionPanelClasses.details}>{props.coach.profileField6}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary 
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                                <Typography className={expansionPanelClasses.heading}>How can Coach {props.coach.firstName} help you improve your game?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography className={expansionPanelClasses.details}>{props.coach.profileField5}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary 
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                                <Typography className={expansionPanelClasses.heading}>What Coach {props.coach.firstName} wants parents and athletes to know: </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography className={expansionPanelClasses.details}>{props.coach.profileField3}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
                <div className="AthleteMessageCoachMessageContent">
                    <p className="AthleteMessageCoachMessageBodyTitle">Still Have Questions for Coach {props.coach.firstName}?</p>
                    <textarea value={messageContent} onChange={e => setMessageContent(e.target.value)}></textarea>
                    <button className="AthleteMessageCoachButton" onClick={e => sendMessage(props.coach)}>Send Message</button>
                    <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={e => setOpenSnackBar(false)}>
                        <Alert onClose={e => setOpenSnackBar(false)} severity="success">
                            Message Sent!
                        </Alert>
                    </Snackbar>
                </div>
            </div>
            <div className="AthleteMessageCoachSessionContainer">
                <div>
                    <p onClick={e => {props.setDisplayMessage(false); props.setShowProfile(true)}}>Go Back To Coach Profile</p>
                </div>
            </div>
        </div>
    );
}

export default AthleteMessageCoach;