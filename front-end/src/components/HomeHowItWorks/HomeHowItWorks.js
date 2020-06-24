import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RepeatIcon from '@material-ui/icons/Repeat';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './HomeHowItWorks.css'

const HomeHowItWorks = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          textAlign: 'center',
          
        },
        paperSettings: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            width: theme.spacing(28),
            height: theme.spacing(24),
          }
      }));
    
      
    const classes = useStyles();
    return (
        <div>
            <div className="HowItWorks">
                <p style={{color: 'darkgreen', fontSize: 'x-large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>How It Works</p>
            </div>
                <div className="HowItWorksPanels">
                    <div style={{display: 'inline-block'}}>
                        <div className={classes.root}>
                            <Paper elevation={5} className={classes.paperSettings}> 
                                <p className="HIWHeader"> Pick Your Coach </p> 
                                <p className="HIWCaption"> Decide which AU coach will help you attain your athletic goals. </p>
                            </Paper>
                            <ArrowForwardIcon fontSize="large" style={{ color: 'darkslategray', paddingTop: '6rem'}}/>
                            <Paper elevation={5} className={classes.paperSettings}> 
                                <p className="HIWHeader"> Put In The Work </p> 
                                <p className="HIWCaption"> Train with your AU coach and capture areas of improvement through our mobile app. </p>
                            </Paper>
                            <RepeatIcon fontSize="large" style={{ color: 'darkslategray', paddingTop: '6rem'}}/>
                            <Paper elevation={5} className={classes.paperSettings}> 
                                <p className="HIWHeader"> Stay Engaged At Home </p> 
                                <p className="HIWCaption"> Recieve feedback from your AU coach and follow their suggested training plan through our mobile app. </p>
                            </Paper>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default HomeHowItWorks;