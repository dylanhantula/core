import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker} from '@material-ui/pickers';
import { createMuiTheme, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';


const container = makeStyles((theme) => ({
    // Intentionally left blank
}));

const materialTheme = createMuiTheme({
    palette: {
      primary: {
          main: '#000'
      }
    }
});


const DateAndTime = props => {
    const containerClass = container();

    return (
        <ThemeProvider theme={materialTheme}>
        <div className={containerClass.root}>
            <Typography gutterBottom style={{maxWidth: '20ch'}}>
                <p style={{fontSize: 'medium'}}>From: </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                    <TimePicker
                        variant="inline"
                        value={props.currentTimes['From']}
                        minutesStep={5}
                        inputVariant="outlined"
                        inputProps={{borderRadius: '0px', borderColor: 'lightslategray'}}
                        onChange={date => {
                            let newDate = props.currentTimes['From'];
                            newDate.setHours(date.getHours());
                            newDate.setMinutes(date.getMinutes());
                            newDate.setSeconds(0);
                            newDate.setMilliseconds(0);
                            
                            props.setUpdates({
                                ...props.updates,
                                [props.slot]: {
                                    'From': newDate.valueOf(),
                                    'To': props.currentTimes['To'].valueOf()
                                }
                            });                                
                        }}
                    />
                </ThemeProvider>
            </MuiPickersUtilsProvider>
            </Typography>
            <Typography gutterBottom style={{maxWidth: '20ch'}}>
            <p style={{fontSize: 'medium'}}>To: </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                    <TimePicker
                        variant="inline"
                        value={props.currentTimes['To']}
                        minutesStep={5}
                        inputVariant="outlined"
                        inputProps={{borderRadius: '0px', borderColor: 'lightslategray'}}
                        onChange={date => {
                            let newDate = props.currentTimes['To'];
                            newDate.setHours(date.getHours());
                            newDate.setMinutes(date.getMinutes());
                            newDate.setSeconds(0);
                            newDate.setMilliseconds(0);
                           
                            props.setUpdates({
                                ...props.updates,
                                [props.slot]: {
                                    'From': props.currentTimes['From'].valueOf(),
                                    'To': newDate.valueOf()
                                }
                            }); 
                        }}
                    />
                </ThemeProvider>
            </MuiPickersUtilsProvider>
            </Typography>
        </div>
        </ThemeProvider>
    );
}

export default DateAndTime;