import React, { useContext, useState } from "react";
import { AuthContext } from "../App/App";
import {getMessages} from '../../api/api';
import RefreshIcon from '@material-ui/icons/Refresh';

const CoachInbox = (props) => {
    const {user} = useContext(AuthContext);
    const [messages, setMessages] = useState({});
    const [conversations, setConversations] = useState({});
    const [currentConv, setCurrentConv] = useState("");

    const getAllMessages = (id) => {
        getMessages(id)
            .then(response => {
                console.log(response);
                setMessages(response.messages);
                setConversations(response.conversations);
            })
            .catch(error => console.log(error));
    }

    const clickHandler = (e) => {
        e.preventDefault();
        getAllMessages(user.firebaseUser.uid);
    }


    return (
        <div>
            <RefreshIcon onClick={e => clickHandler(e)}/>
            <div className="CoachInboxHeader">
                <p>Messages</p>
            </div>
            <div className="CoachInboxBody">
                <div className="CoachInboxConversations">
                {Object.keys(conversations).map((item, i) => (
                    <button key={i} onClick={e => setCurrentConv(item)}>{conversations[item]['firstName']} {conversations[item]['lastName']}</button>
                ))}
                </div>
                <div className="CoachInboxMessageWindow">
                {(currentConv !== "") ? (messages[currentConv].map((msg, i) => (
                <p key={i}>{msg['content']} {new Date(msg['time']).toString()}</p>
                
                ))): null}
                </div>
            </div>
            
        </div>
    );
}

export default CoachInbox;