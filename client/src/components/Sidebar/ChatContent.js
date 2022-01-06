import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notification: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#ffffff",
    background: "#3f92ff",
    borderRadius: 20,
    marginLeft: 20,
    textAlign: 'center',
    padding:  "5px 10px",
    height: 28
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadMsgCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText} 
        </Typography>
      </Box>
        
      { unreadMsgCount > 0 && <Box component="span" className={classes.notification}>
        {unreadMsgCount}
      </Box> }
    </Box>
  );
};

export default ChatContent;
