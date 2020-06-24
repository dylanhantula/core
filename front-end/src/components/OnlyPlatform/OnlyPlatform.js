import React from 'react';
import { withRouter } from 'react-router-dom';
import './OnlyPlatform.css';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';

const OnlyPlatform = props => {

    const learnMoreHandler = (e) => {
        e.preventDefault();
        props.history.push({
        pathname: '/ourstory',
        });
    };

    return (
        <Paper elevation={10}>
        <div style={{border: '2.5rem solid darkseagreen', marginTop: '2.5rem', padding: '1.9rem'}}>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 'x-large', 
            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>{props.title}</p>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <p className="paragraphReason">{props.reasonParagraph1} <br></br> <br></br> {props.reasonParagraph2}</p>
                <ul className="listOfReasons"> 
                    {props.reasonList.map((reason) => {
                        return  <li>
                                    <div style={{display: 'flex',  alignItems: 'center'}}>
                                        <CheckIcon  style={{paddingRight: '0.7rem', color: green[800]}}/>
                                        <p >{reason}</p>
                                    </div>
                                </li>;
                    })}
                </ul>
            </div>
            <div style={{textAlign: 'center'}}>
                <button className="LearnMore" onClick={(e) => learnMoreHandler(e)}>Learn More</button>
            </div>
        </div>
        </Paper>
    );
}

export default withRouter(OnlyPlatform);