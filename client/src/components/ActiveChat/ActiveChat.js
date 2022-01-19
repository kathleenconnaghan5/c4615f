import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { recordLastMessageSeen } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, recordLastMessageSeen } = props;
  const conversation = props.conversation || {};

  let mostRecentMessageFromOtherUser = null;
  // set the most recent message to send to server
  if (conversation.messages) {
    for (let i = messages.length - 1; i >= 0; i--) {
      let msg = sortedMessages[i];
      if (msg.senderId === conversation.otherUser.id) {
        mostRecentMessageFromOtherUser = msg;
        break;
      }
    }
  }

  useEffect(() => {
    if (mostRecentMessageFromOtherUser) {
      recordLastMessageSeen({
        userIdThatSawMessage: user.id,
        messageId: mostRecentMessageFromOtherUser.id,
        conversationId: conversation.id,
      });
    }
  }, [mostRecentMessageFromOtherUser, conversation.id, recordLastMessageSeen, user.id]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              lastMessageIdOtherUserSaw={conversation.lastMessageOtherUserSaw}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recordLastMessageSeen: (message) => {
      dispatch(recordLastMessageSeen(message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
