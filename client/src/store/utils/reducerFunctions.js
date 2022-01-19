export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadMsgCount: 1,
    };
    newConvo.latestMessageText = message.text;
    return [...state, newConvo];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const newConvo = { ...convo };
      const newMsgArray = convo.messages.slice();
      newMsgArray.push(message);
      newConvo.messages = newMsgArray;
      newConvo.latestMessageText = message.text;
      if (message.senderId === newConvo.otherUser.id) {
        newConvo.unreadMsgCount++;
      }
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const setCountInStore = (state, conversationId, count) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const newConvo = { ...convo };
      newConvo.unreadMsgCount = count;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const setLastMessageSeenInStore = (state, payload) => {
  return state.map((convo) => {
    if (
      convo.id === payload.conversationId &&
      convo.otherUser.id === payload.userIdThatSawMessage
    ) {
      const newConvo = { ...convo };
      newConvo.lastMessageOtherUserSaw = payload.messageId;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });
  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      const newMsgArray = convo.messages.slice();
      newMsgArray.push(message);
      newConvo.messages = newMsgArray;
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};
