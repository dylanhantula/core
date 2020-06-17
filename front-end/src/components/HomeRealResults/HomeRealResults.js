import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './HomeRealResults.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const HomeRealResults = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          textAlign: 'center',
          '& > *': {
            margin: theme.spacing(5),
            padding: theme.spacing(3),
            width: theme.spacing(30),
            height: theme.spacing(20),
          },
        },
      }));
    
    const classes = useStyles();

    return (
        <div style={{backgroundColor: 'darkseagreen'}}>
            <div className="HomeRealResults">
                <p style={{color: 'darkgreen', fontSize: 'x-large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>
                    Real Results from the AU Community 
                </p>
            </div>
                <div className="HomeRealResultsPanels">
                    <div style={{display: 'inline-block'}}>
                        <div className={classes.root}>
                            <Paper elevation={5}  variant='outlined'> 
                                <AccountCircleIcon fontSize="large" className="RRHeader" /> 
                                <p className="RRCaption"> Example Parent </p>
                            </Paper>
                            <Paper elevation={5} variant='outlined'> 
                                <AccountCircleIcon fontSize="large" className="RRHeader" />
                                <p className="RRCaption"> Example Coach</p>
                            </Paper>
                            <Paper elevation={5} variant='outlined'> 
                                <AccountCircleIcon fontSize="large" className="RRHeader"/>
                                <p className="RRCaption"> Example Athlete </p>
                            </Paper>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default HomeRealResults;