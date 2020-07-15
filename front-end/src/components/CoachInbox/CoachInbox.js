import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App/App";
import { getMessages, createMessage } from '../../api/api';
import RefreshIcon from '@material-ui/icons/Refresh';
import './CoachInbox.css';
import Paper from '@material-ui/core/Paper';
import ArchiveIcon from '@material-ui/icons/Archive';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}



const CoachInbox = (props) => {
    const {user} = useContext(AuthContext);
    const [messages, setMessages] = useState({});
    const [conversations, setConversations] = useState({});
    const [currentConv, setCurrentConv] = useState("");
    const [messageToSend, setMessageToSend] = useState("");
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [messagesEnd, setMessagesEnd] = useState(null);
    
    useEffect(()=> {
        if (messagesEnd !== null) {
            messagesEnd.scrollIntoView({behavior: 'smooth'})
        }
    }, [currentConv, messages, messagesEnd]);

    useEffect(() => {
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            getMessages(idToken, user.firebaseUser.uid)
            .then(response => {
                setMessages(response.messages);
                setConversations(response.conversations);
            })
            .catch(error => console.log(error));
        });
    }, [user.firebaseUser])

    const getAllMessages = (id) => {
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            getMessages(idToken, id)
            .then(response => {
                setMessages(response.messages);
                setConversations(response.conversations);
            })
            .catch(error => console.log(error));
        });
    }

    const sendMessage = (e, message) => {
        e.preventDefault();
        const messageToSend = {
            "to": currentConv,
            "from": user.firebaseUser.uid,
            "content": message,
            "time": Date.now() // number of milliseconds since Jan 1 1970 UTC
        }
        createMessage(messageToSend)
            .then(response => {
                setOpenSnackBar(true);
                setMessageToSend("");
                getAllMessages(user.firebaseUser.uid)
            })
            .catch(e => console.log(e));
    }

    const refreshHandler = (e) => {
        e.preventDefault();
        getAllMessages(user.firebaseUser.uid);
    }

    return (
        <div>
            <div className="CoachInboxHeader">
                <p>Messages</p>
                {(currentConv !== "") ? <p>{conversations[currentConv]['firstName']} {conversations[currentConv]['lastName']}</p>:null}
                <div>
                <RefreshIcon className="CoachInboxIconButtons" onClick={e => refreshHandler(e)}/>
                <ArchiveIcon className="CoachInboxIconButtons"/>
                </div>
            </div>
            <div className="CoachInboxBody">
                <div className="CoachInboxConversations">
                    {Object.keys(conversations).map((item, i) => (
                        <Paper 
                            square 
                            variant="outlined" 
                            className="CoachInboxConversationPaper" 
                            key={i} 
                            onClick={e => {setCurrentConv(item); }}>
                                <p>{conversations[item]['firstName']} {conversations[item]['lastName']}</p>
                                <p>{messages[item][messages[item].length - 1]['content']}</p>
                        </Paper>
                    ))}
                </div>
                <div className="CoachInboxMessageWindow">
                    <div className="CoachInboxMessageWindowFirstChild">
                        {(currentConv !== "") ? (messages[currentConv].map((msg, i) => (
                            <Paper 
                                square 
                                key={i}
                                elevation={0} 
                                className="CoachInboxMessageContent" >
                                    { (i === 0 || (new Date(msg['time']).getUTCDay() !==  new Date(messages[currentConv][i-1]['time']).getUTCDay()))
                                        ? <p className="CoachInboxDateSeparatorText">
                                            {new Date(msg['time']).toDateString()}
                                        </p>
                                    :null }
                                    <div className="CoachInboxMessageContentNameandDate">
                                        <p className="CoachInboxMessageContentName">
                                            {msg['from'] === user.firebaseUser.uid ? "You":conversations[currentConv]['firstName'] + " " + conversations[currentConv]['lastName']}
                                        </p>
                                        <p className="CoachInboxMessageContentDate">
                                            {new Date(msg['time']).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </p>
                                    </div>
                                    <div>
                                        <p>{msg['content']} </p>
                                    </div>
                                    
                            </Paper>
                        ))): null}
                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { setMessagesEnd(el); }}></div>
                    </div>
                    <div className="CoachInboxMessageWindowSecondChild">
                        {currentConv !== "" ? 
                        <div className="CoachInboxMessageToSend">
                            <textarea 
                                placeholder="Type a message..."
                                value={messageToSend}
                                onChange={e => setMessageToSend(e.target.value)}>
                            </textarea>
                            <SendIcon 
                                className="CoachInboxIconButtons"
                                onClick={e => sendMessage(e, messageToSend)}/>
                            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={e => setOpenSnackBar(false)}>
                                <Alert onClose={e => setOpenSnackBar(false)} severity="success">
                                    Message Sent!
                                </Alert>
                            </Snackbar>
                        </div>:null}
                    </div>
                
                </div>
            </div>
            
        </div>
    );
}

export default CoachInbox;