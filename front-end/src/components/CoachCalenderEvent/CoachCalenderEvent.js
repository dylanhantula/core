import React, { useState } from 'react';
import { withStyles, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker, TimePicker} from '@material-ui/pickers';


const buttonStyles = makeStyles({
    red: {
      color: 'red',
      borderColor: 'red',
      margin: '0rem 0.2rem'
    },
    blue: {
        color: '#0080ff',
        borderColor: '#0080ff',
        margin: '0rem 0.2rem'
    },
    yellow: {
        color: '#ffcc00',
        borderColor: '#ffcc00',
        margin: '0rem 0.2rem'
    },
    green: {
        color: 'green',
        borderColor: 'green',
        margin: '0rem 0.2rem'
    }
  });

  const materialTheme = createMuiTheme({
    palette: {
      primary: {
          main: '#000'
      }
    }
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    elevation: 0
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
}))(MuiDialogContent);
  
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);





const CoachCalenderDialog = props => {
    const [editMode, setEditMode] = useState(false);
    const [timeUpdates, setTimeUpdates] = useState({});
    const [editStartTime, setEditStartTime] = useState(new Date(props.selectedEvent['startTime']));
    const [editEndTime, setEditEndTime] = useState(new Date(props.selectedEvent['endTime']));

    const buttonClasses = buttonStyles();


    const handleClose = () => {
        props.setOpen(false);
    };

    const updateEventHandler = (e, eventID, newStatus) => {
        e.preventDefault();
        const updates = {
            'coachStatus': newStatus
        };
        props.updateEvent(eventID, updates);
    }

    const updateEventTimeHandler = (e, eventID) => {
        e.preventDefault();
        const updates = {
            ...timeUpdates,
            'coachStatus': 'accepted',
            'athleteStatus': 'pending',
            'status': 'pending'
        };
        props.updateEvent(eventID, updates)
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} fullwidth>
          Session with {props.name}
        </DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
                {props.selectedEvent['coachStatus'] === "accepted" && props.selectedEvent['athleteStatus'] === "pending" ? 
                    <div>
                        <Alert severity="warning">This event is pending until {props.name} accepts.</Alert>
                        <Alert severity="success">You have accepted this event.</Alert>
                    </div>
                    :null}
                {props.selectedEvent['coachStatus'] === "pending" && props.selectedEvent['athleteStatus'] === "accepted" ? 
                    <div>
                        <Alert severity="warning">Accepting will officially book this event. However, editing will instead require {props.name} to accept the changed time.</Alert>
                        <Alert severity="success">{props.name} has accepted this event.</Alert>
                    </div>
                    :null}
                
                {props.selectedEvent['coachStatus'] === "accepted" && props.selectedEvent['athleteStatus'] === "accepted" ? 
                    <div>
                        <Alert severity="success">You have accepted this event.</Alert>
                        <Alert severity="success">{props.name} has accepted this event.</Alert>
                    </div>
                    :null}
            </Typography>
            <Typography gutterBottom style={{fontSize: 'large'}}>
                {!editMode ? new Date(props.selectedEvent['startTime']).toDateString():
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={materialTheme}>
                    <DatePicker
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        value={editStartTime}
                        onChange={date => {
                            let newDate = editStartTime;
                            newDate.setMonth(date.getMonth());
                            newDate.setDate(date.getDate());
                            newDate.setFullYear(date.getFullYear());
                            newDate.setSeconds(0);
                            newDate.setMilliseconds(0);
                            setEditStartTime(newDate);
                            setEditEndTime(new Date(newDate.valueOf() + 3600000))
                            setTimeUpdates({
                                ...timeUpdates,
                                'startTime': newDate.valueOf(),
                                'endTime': newDate.valueOf() + 3600000
                            })
                        }}
                    />
                    </ThemeProvider>
                </MuiPickersUtilsProvider>}
            </Typography>
            <Typography gutterBottom>
                Start: {!editMode ? new Date(props.selectedEvent['startTime']).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}):
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={materialTheme}>
                        <TimePicker
                            variant="inline"
                            value={editStartTime}
                            inputVariant="outlined"
                            minutesStep={5}
                            onChange={date => {
                                let newDate = editStartTime;
                                newDate.setHours(date.getHours());
                                newDate.setMinutes(date.getMinutes());
                                newDate.setSeconds(0);
                                newDate.setMilliseconds(0);
                                setEditStartTime(newDate);
                                setEditEndTime(new Date(newDate.valueOf() + 3600000))
                                setTimeUpdates({
                                    ...timeUpdates,
                                    'startTime': newDate.valueOf(),
                                    'endTime': newDate.valueOf() + 3600000
                                })
                            }}
                        />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>}
            </Typography>
            <Typography gutterBottom>
                End: {!editMode ? new Date(props.selectedEvent['endTime']).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}):
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={materialTheme}>
                        <TimePicker
                            variant="inline"
                            inputVariant="outlined"
                            disabled
                            value={editEndTime}
                        />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>}
            </Typography>
            
        </DialogContent>
        {editMode ? 
            <DialogActions>
                <Button 
                    variant="outlined" 
                    className={buttonClasses.blue} 
                    onClick={(e) => updateEventTimeHandler(e, props.selectedEvent['eventDocID'])}>
                Save </Button>
            </DialogActions>:
        <DialogActions>
            
            {props.selectedEvent['status'] && props.selectedEvent['status'] === "pending" ? 
                <div>
                    {props.selectedEvent['coachStatus'] === "accepted" ? 
                    <div>
                        <Button variant="outlined" className={buttonClasses.yellow} onClick={e => setEditMode(true)}>
                            Edit
                        </Button>
                        <Button variant="outlined" onClick={(e) => updateEventHandler(e, props.selectedEvent['eventDocID'], "denied")} className={buttonClasses.red}>
                            Delete
                        </Button>
                    </div>:
                    <div>
                        <Button variant="outlined" onClick={(e) => updateEventHandler(e, props.selectedEvent['eventDocID'], "accepted")} className={buttonClasses.green}>
                            Accept
                        </Button>
                        <Button variant="outlined" className={buttonClasses.yellow} onClick={e => setEditMode(true)}>
                            Edit
                        </Button>
                        <Button variant="outlined" onClick={(e) => updateEventHandler(e, props.selectedEvent['eventDocID'], "denied")} className={buttonClasses.red}>
                            Deny
                        </Button>
                    </div>
                    }
                      
                </div>
                :
                <div>
                    {props.selectedEvent['status'] && props.selectedEvent['status'] === "accepted" ?
                    <div>
                        <Button variant="outlined" className={buttonClasses.blue}>
                            Complete
                        </Button>
                        <Button variant="outlined" onClick={(e) => updateEventHandler(e, props.selectedEvent['eventDocID'], "canceled")} className={buttonClasses.red}>
                            Cancel
                        </Button>
                    </div>
                    :null}
            </div>}
        </DialogActions>}
      </Dialog>
    );
}

export default CoachCalenderDialog;