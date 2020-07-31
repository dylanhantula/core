import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker} from '@material-ui/pickers';
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
        {props.showDatePicker ? 
            <Typography gutterBottom style={{maxWidth: '20ch'}}>
                <p className="CalendarPFont" style={{fontSize: 'medium', textAlign: 'center'}}>On: </p>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={materialTheme}>
                        <DatePicker
                            disableToolbar
                            variant="inline"
                            value={props.currentTimes['From']}
                            inputVariant="outlined"
                            inputProps={{borderRadius: '0px', borderColor: 'lightslategray'}}
                            onChange={newStartDate => {
                                const currentStart = props.currentTimes['From'];
                                const currentEnd = props.currentTimes['To'];
                                newStartDate.setHours(currentStart.getHours());
                                newStartDate.setMinutes(currentStart.getMinutes());
                                newStartDate.setSeconds(0);
                                newStartDate.setMilliseconds(0);
                                let newEndDate = new Date(newStartDate.valueOf());
                                newEndDate.setHours(currentEnd.getHours());
                                newEndDate.setMinutes(currentEnd.getMinutes());
                                newEndDate.setSeconds(0);
                                newEndDate.setMilliseconds(0);
                                props.setUpdates({
                                    ...props.updates,
                                    [props.slot]: {
                                        'From': newStartDate,
                                        'To': newEndDate
                                    }
                                }); 
                                if (props.setAllCurrentTimes) {
                                    props.setAllCurrentTimes({
                                        ...props.allCurrentTimes,
                                        [props.slot]: {
                                            'From': newStartDate,
                                            'To': newEndDate
                                        }
                                    }); 
                                }                               
                            }}
                            
                        />
                    </ThemeProvider>
                </MuiPickersUtilsProvider>
            </Typography>:null}
            <Typography gutterBottom style={{maxWidth: '20ch'}}>
                <p className="CalendarPFont" style={{fontSize: 'medium', textAlign: 'center'}}>From: </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                    <TimePicker
                        variant="inline"
                        value={props.currentTimes['From']}
                        minutesStep={5}
                        inputVariant="outlined"
                        inputProps={{borderRadius: '0px', borderColor: 'lightslategray'}}
                        onChange={date => {
                            const current = props.currentTimes['From'];
                            date.setFullYear(current.getFullYear());
                            date.setMonth(current.getMonth());
                            date.setDate(current.getDate());
                            date.setSeconds(0);
                            date.setMilliseconds(0);
                            props.setUpdates({
                                ...props.updates,
                                [props.slot]: {
                                    'From': date,
                                    'To': props.currentTimes['To']
                                }
                            }); 
                            if (props.setAllCurrentTimes) {
                                props.setAllCurrentTimes({
                                    ...props.allCurrentTimes,
                                    [props.slot]: {
                                        'From': date,
                                        'To': props.currentTimes['To']
                                    }
                                }); 
                            }                               
                        }}
                    />
                </ThemeProvider>
            </MuiPickersUtilsProvider>
            </Typography>
            <Typography gutterBottom style={{maxWidth: '20ch'}}>
            <p className= "CalendarPFont" style={{fontSize: 'medium', textAlign: 'center'}}>To: </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                    <TimePicker
                        variant="inline"
                        value={props.currentTimes['To']}
                        minutesStep={5}
                        inputVariant="outlined"
                        inputProps={{borderRadius: '0px', borderColor: 'lightslategray'}}
                        onChange={date => {
                            const current = props.currentTimes['To'];
                            date.setFullYear(current.getFullYear());
                            date.setMonth(current.getMonth());
                            date.setDate(current.getDate());
                            date.setSeconds(0);
                            date.setMilliseconds(0);
                            props.setUpdates({
                                ...props.updates,
                                [props.slot]: {
                                    'From': props.currentTimes['From'],
                                    'To': date
                                }
                            }); 
                            if (props.setAllCurrentTimes) {
                                props.setAllCurrentTimes({
                                    ...props.allCurrentTimes,
                                    [props.slot]: {
                                        'From': props.currentTimes['From'],
                                        'To': date
                                    }
                                }); 
                            }
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