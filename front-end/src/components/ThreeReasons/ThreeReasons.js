import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './ThreeReasons.css'
import picture from './mountain.png';

const ThreeReasons = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'block',
          flexWrap: 'wrap',
          textAlign: 'center',
          '& > *': {
            margin: theme.spacing(5),
            padding: theme.spacing(0),
            width: theme.spacing(165),
            height: theme.spacing(45),
          },
        },
      }));
    
      
    const classes = useStyles();
    return (
        <div>
            <div className="ThreeReasonsTitle">
                <p style={{color: 'darkgreen', fontWeight: 'bold', fontSize: 'x-large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>{props.title}</p>
            </div>
                <div className="ThreeReasonsPanels">
                    <div style={{display: 'inline-block'}}>
                        <div className={classes.root}>
                            <Paper elevation={0}>
                                <ul style={{listStyleType: 'none', display: 'flex', justifyContent: 'space-evenly', padding: '0px', marginTop: '40px'}}>
                                    <li><img src={picture} alt="mountain_picture" style={{width: '500px'}}/></li>
                                    <li style={{paddingLeft: '75px'}}><div style={{marginTop: '40px'}}><p className="HIWHeader"> {props.box1.header} </p> 
                                <p className="HIWCaption"> {props.box1.caption}</p></div></li>
                                </ul> 
                            </Paper>
                            <Paper elevation={0}>
                                <ul style={{listStyleType: 'none', display: 'flex', justifyContent: 'space-evenly', padding: '0px', marginTop: '40px'}}>
                                    <li><img src={picture} alt="mountain_picture" style={{width: '500px'}}/></li>
                                    <li style={{paddingLeft: '75px'}}><div style={{marginTop: '40px'}}><p className="HIWHeader"> {props.box2.header} </p> 
                                <p className="HIWCaption"> {props.box2.caption}</p></div></li>
                                </ul> 
                            </Paper>
                            <Paper elevation={0}>
                                <ul style={{listStyleType: 'none', display: 'flex', justifyContent: 'space-evenly', padding: '0px', marginTop: '40px'}}>
                                    <li><img src={picture} alt="mountain_picture" style={{width: '500px'}}/></li>
                                    <li style={{paddingLeft: '75px'}}><div style={{marginTop: '40px'}}><p className="HIWHeader"> {props.box3.header} </p> 
                                <p className="HIWCaption"> {props.box3.caption}</p></div></li>
                                </ul> 
                            </Paper>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default ThreeReasons;
  
