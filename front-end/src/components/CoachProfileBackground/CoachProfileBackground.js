import React from 'react';
import './CoachProfileBackground.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';



const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#006400',
      }
    }
  });

const useStyles = makeStyles((theme) => ({
    label: {
        fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'
    }
}));


const CoachProfileBackground = (props) => {
    const styleClasses = useStyles();
    return (
        <ThemeProvider theme={theme}>
        <div style={{backgroundColor: 'darkseagreen'}}>
            <div className="coachProfileBackgroundContainer">
                <div className="coachProfileBackgroundInfo">
                    <h1>Athletic Background</h1>
                    <FormControl component="fieldset">
                            <p className="lucidaFont">Highest Playing Level</p>
                            <RadioGroup 
                                aria-label="playingLevel" 
                                name="playingLevel" 
                                value={props.states["playingExp"]} 
                                onChange={e => {
                                    props.stateFunctions["playingExp"](e.target.value); 
                                    props.setUploadVals({
                                        ...props.uploadVals,
                                        "playingExp": e.target.value
                                    });
                                }}>
                                <FormControlLabel value="High School" control={<Radio color="primary"/>} label="High School" classes={{label: styleClasses.label}}/>
                                <FormControlLabel value="College" control={<Radio color="primary"/>} label="College" classes={{label: styleClasses.label}}/>
                                <FormControlLabel value="Professional" control={<Radio color="primary"/>} label="Professional" classes={{label: styleClasses.label}}/>
                            </RadioGroup>
                    </FormControl>
                    <div>
                        <p>Summary of Career and Accomplishments</p>
                        <textarea 
                            value={props.states["profileField1"]} 
                            onChange={e => {
                                props.stateFunctions["profileField1"](e.target.value); 
                                props.setUploadVals({
                                    ...props.uploadVals,
                                    "profileField1": e.target.value
                                    });
                                }
                            }>
                        </textarea>   
                    </div>
                    
                    <div>
                        <p>Who is the best coach you ever had and why?</p>
                        <textarea 
                            value={props.states["profileField2"]} 
                            onChange={e => {
                                props.stateFunctions["profileField2"](e.target.value); 
                                props.setUploadVals({
                                    ...props.uploadVals,
                                    "profileField2": e.target.value
                                    });
                                }
                            }>
                        </textarea>    
                    </div>
                    <div>
                        <p>What should athletes and parents know about you?</p>
                        <textarea 
                            value={props.states["profileField3"]} 
                            onChange={e => {
                                props.stateFunctions["profileField3"](e.target.value); 
                                props.setUploadVals({
                                    ...props.uploadVals,
                                    "profileField3": e.target.value
                                    });
                                }
                            }>
                        </textarea>        
                    </div>

                </div>
                <div className="coachProfileBackgroundInfo">
                    <h1>Coaching Background</h1>
                    <FormControl component="fieldset">
                            <p className="lucidaFont">Is coaching your full-time job?</p>
                            <RadioGroup 
                                aria-label="fullTime" 
                                name="fullTime" 
                                value={props.states["fullTime"]} 
                                onChange={e => {
                                    props.stateFunctions["fullTime"](e.target.value); 
                                    props.setUploadVals({
                                        ...props.uploadVals,
                                        "fullTime": e.target.value
                                    });
                                }}>                                
                                <FormControlLabel value="Yes" control={<Radio color="primary"/>} label="Yes" classes={{label: styleClasses.label}}/>
                                <FormControlLabel value="No" control={<Radio color="primary"/>} label="No" classes={{label: styleClasses.label}}/>
                            </RadioGroup>
                    </FormControl>
                    <div>
                        <p>Summary of Coaching Background</p>
                        <textarea 
                            value={props.states["profileField4"]} 
                            onChange={e => {
                                props.stateFunctions["profileField4"](e.target.value); 
                                props.setUploadVals({
                                    ...props.uploadVals,
                                    "profileField4": e.target.value
                                    });
                                }
                            }>
                        </textarea>                        
                    </div>
                    <div>
                        <p>How can you help someone improve their game?</p>
                        <textarea 
                            value={props.states["profileField5"]} 
                            onChange={e => {
                                props.stateFunctions["profileField5"](e.target.value); 
                                props.setUploadVals({
                                    ...props.uploadVals,
                                    "profileField5": e.target.value
                                    });
                                }
                            }>
                        </textarea>                        
                    </div>
                    <div>
                        <p>What does a typical training session look like?</p>
                        <textarea 
                            value={props.states["profileField6"]} 
                            onChange={e => {
                                props.stateFunctions["profileField6"](e.target.value); 
                                props.setUploadVals({
                                    ...props.uploadVals,
                                    "profileField6": e.target.value
                                    });
                                }
                            }>
                        </textarea>                         
                    </div>
                </div>
            </div>
            <div className="coachProfileBackgroundSave">
                <button onClick={e => props.submit(e)}>Save</button>
            </div>
        </div>
        </ThemeProvider>
    );
}

export default CoachProfileBackground;