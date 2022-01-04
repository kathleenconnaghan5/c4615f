import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";



const Messages = (props) => {
  const { messages, otherUser, userId, lastMessageIdOtherUserSaw } = props;

  return (
    <Box>
      {[...messages]
        .sort((a, b) => {
          if (new Date(a.createdAt) > new Date(b.createdAt)) {
            return 1;
          }
          return -1;
        })
        .map((message) => {
          const time = moment(message.createdAt).format("h:mm");
          const isLastMessageSeen = lastMessageIdOtherUserSaw === message.id;
          return message.senderId === userId ? (
    
            <SenderBubble key={message.id} text={message.text} time={time} isLastMessageSeen={isLastMessageSeen} otherUser={otherUser} />
          ) : (
            <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser}/>
          );
        })
      }
    </Box>
  );
};

export default Messages;
