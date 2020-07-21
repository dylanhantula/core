import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
            'status': newStatus
        };
        props.updateEvent(eventID, updates);
    }

    const updateEventTimeHandler = (e, eventID) => {
        e.preventDefault();
        props.updateEvent(eventID, timeUpdates)
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} fullwidth>
          Session with {props.name}
        </DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
                {props.selectedEvent['status'] && props.selectedEvent['status'] === "pending" ? 
                    <Alert severity="warning">This session is pending until you accept or deny it.</Alert>:null}
                {!props.selectedEvent['status'] || props.selectedEvent['status'] === "accepted" ? 
                    <Alert severity="success">You have accepted this event. It can be canceled below.</Alert>:null}
                {props.selectedEvent['status'] && props.selectedEvent['status'] === "canceled" ?
                    <Alert severity="error">You have canceled this event. Another session must be scheduled.</Alert>:null}
            </Typography>
            <Typography gutterBottom style={{fontSize: 'large'}}>
                {!editMode ? new Date(props.selectedEvent['startTime']).toDateString():
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                </MuiPickersUtilsProvider>}
            </Typography>
            <Typography gutterBottom>
                Start: {!editMode ? new Date(props.selectedEvent['startTime']).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}):
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            variant="inline"
                            value={editStartTime}
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
                    </MuiPickersUtilsProvider>}
            </Typography>
            <Typography gutterBottom>
                End: {!editMode ? new Date(props.selectedEvent['endTime']).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}):
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            variant="inline"
                            disabled
                            value={editEndTime}
                        />
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
                :
                <div>
                    <Button variant="outlined" className={buttonClasses.yellow} onClick={e => setEditMode(true)}>
                        Edit
                    </Button>
                    {props.selectedEvent['status'] && props.selectedEvent['status'] === "canceled" ? null:
                    <Button variant="outlined" onClick={(e) => updateEventHandler(e, props.selectedEvent['eventDocID'], "canceled")} className={buttonClasses.red}>
                    Cancel
                    </Button>}
                
            </div>}
        </DialogActions>}
      </Dialog>
    );
}

export default CoachCalenderDialog;