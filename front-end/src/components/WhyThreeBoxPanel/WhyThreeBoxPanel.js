import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './WhyThreeBoxPanel.css';
import PinDropIcon from '@material-ui/icons/PinDrop';
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SportsIcon from '@material-ui/icons/Sports';

const WhyThreeBoxPanel = props => {
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          textAlign: 'center',
          '& > *': {
            margin: theme.spacing(1),
            padding: theme.spacing(5),
            width: theme.spacing(30),
            height: theme.spacing(25),
          },
        },
      }));
    
    let box1icon = <PinDropIcon fontSize='large' color='other'/>;
    let box2icon = <StarIcon fontSize='large'/>;
    let box3icon = <TrendingUpIcon fontSize='large'/>;
    if (props.page === 'DedicatedCoaches') {
        box1icon = <MonetizationOnIcon fontSize='large'/>;
        box2icon = <EventAvailableIcon fontSize='large'/>;
        box3icon = <SportsIcon fontSize='large'/>;
    }
    
      
    const classes = useStyles();
    return (
        <div>
            <div className="ThreeBoxTitle">
                <p style={{color: 'black', fontSize: 'x-large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>{props.title}</p>
            </div>
                <div className="ThreeBoxPanels">
                    <div style={{display: 'inline-block'}}>
                        <div className={classes.root}>
                            <Paper elevation={0} > 
                                <p className="HIWHeader"> {props.box1.header}</p>
                                {box1icon}
                                <p className="HIWCaption">{props.box1.caption}</p>
                            </Paper>
                            <Paper elevation={0} > 
                                
                                <p className="HIWHeader"> {props.box2.header}</p> 
                                {box2icon}
                                <p className="HIWCaption">{props.box2.caption}</p>

                            </Paper>
                            <Paper elevation={0} > 
                                <p className="HIWHeader"> {props.box3.header}</p> 
                                {box3icon}
                                <p className="HIWCaption"> {props.box3.caption}</p>
                            </Paper>
                        </div>
                    </div>
            </div>
        </div>
    );

}

export default WhyThreeBoxPanel;