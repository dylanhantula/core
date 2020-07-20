import React from 'react';
import { withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { green, red } from '@material-ui/core/colors';


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

const buttonTheme = createMuiTheme({
    palette: {
      primary: green,
      secondary: red
    },
});


const CoachCalenderDialog = props => {
    
    const handleClose = () => {
        props.setOpen(false);
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} fullwidth>
          Session with {props.name}
        </DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
                {props.selectedEvent['status'] && props.selectedEvent['status'] === "pending" ? <Alert severity="warning">This session is pending until you accept or deny it.</Alert>:null}
                {!props.selectedEvent['status'] ? <Alert severity="success">You have accepted this event.</Alert>:null}
            </Typography>
            <Typography gutterBottom>
                {new Date(props.selectedEvent['startTime']).toDateString()}
            </Typography>
            <Typography gutterBottom>
                Start Time: {new Date(props.selectedEvent['startTime']).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Typography>
            <Typography gutterBottom>
                End Time: {new Date(props.selectedEvent['endTime']).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Typography>
        </DialogContent>
        <DialogActions>
            {props.selectedEvent['status'] && props.selectedEvent['status'] === "pending" ? 
                <ThemeProvider theme={buttonTheme}>
                    <Button variant="outlined" onClick={handleClose} color="primary">
                        Accept
                    </Button>
                    <Button variant="outlined" onClick={handleClose} color="secondary">
                        Deny
                    </Button>
                </ThemeProvider>
                :
                <ThemeProvider theme={buttonTheme}>
                <Button variant="outlined" onClick={handleClose} color="secondary">
                    Delete
                </Button>
            </ThemeProvider>}
        </DialogActions>
      </Dialog>
    );
}

export default CoachCalenderDialog;