import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput";
import Message from "./Message";
import db from "../firebase";
import firebase from "firebase";
import { useParams } from "react-router-dom";
import { useCallback } from "react";

const Chat = ({ user }) => {
  const { id } = useParams();
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);

  const getChannel = useCallback(() => {
    db.collection("rooms")
      .doc(id)
      .onSnapshot((snap) => {
        setRoom(snap.data());
      });
  }, [id]);

  const getMessages = useCallback(() => {
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snap) => {
        let messages = snap.docs.map((doc) => doc.data());

        setMessages(messages);
      });
  }, [id]);

  const sendMessage = (text) => {
    if (id) {
      let paylaod = {
        text,
        user: user.name,
        userImage: user.photo,
        timestamp: firebase.firestore.Timestamp.now(),
      };

      db.collection("rooms").doc(id).collection("messages").add(paylaod);
    }
  };

  useEffect(() => {
    getChannel();
    getMessages();
  }, [id,getChannel,getMessages]);

  return (
    <Container>
      <Header>
        <Channel>
          <ChannelName># {room && room.name}</ChannelName>
          <ChannelInfo>
            Company wide announcements and work based matters
          </ChannelInfo>
        </Channel>
        <ChannelDetails>
          <div>Details</div>
          <Info />
        </ChannelDetails>
      </Header>

      <MessageContainer>
        {messages.length > 0 &&
          messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              name={message.user}
              image={message.userImage}
              timestamp={message.timestamp}
            />
          ))}
      </MessageContainer>

      <ChatInput sendMessage={sendMessage} />
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: grid;
  grid-template-rows: 64px auto min-content;
  min-height: 0;
`;

const Channel = styled.div``;

const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  color: #606060;
`;

const ChannelName = styled.div`
  font-weight: 700;
`;

const ChannelInfo = styled.div`
  font-weight: 400;
  color: #606060;
  font-size: 13px;
  margin-top: 8px;
`;

const Info = styled(InfoOutlinedIcon)`
  margin-left: 10px;
`;

const Header = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(83, 39, 83, 0.13);
  justify-content: space-between;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
