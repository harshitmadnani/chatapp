import React from 'react';
import { useContext, useEffect,  useState } from "react";
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';
import ReactScrollToBottom from "react-scroll-to-bottom"

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);



function Messages(props) {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
const [message, setMessage ] = useState("")
 
  const handleSubmit = (e) => {
    e.preventDefault()
    //  sendMessage(message)
      setMessage("")
    }
  
  const handleChange =(e) => {
  const  message = e.target.value;


  return (
    
    <div className="messages">
      <Header />
      <h4 style={{color:"gray", fontWeight:"400" , marginLeft:"10vw"  }}> {initialBottyMessage} </h4>
      <div className="messages__list" id="message-list">
      </div>

      <ReactScrollToBottom> {Message.map(message =>{message})} </ReactScrollToBottom>

      {/* <Footer message={message} sendMessage={sendMessage} onChangeMessage={onChangeMessage} > </Footer> */}
      
      <form
            onSubmit={handleSubmit}
            className="send-message-form">
            <input
              onChange={handleChange}
              value={message}
              placeholder="Enter your message"
              type="text" />
        </form>
    </div>

  );
}}

export default Messages