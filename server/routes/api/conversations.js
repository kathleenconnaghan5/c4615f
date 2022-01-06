const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id", "user1LastMessageIdSeen", "user2LastMessageIdSeen", "user1UnreadMsgCount", "user2UnreadMsgCount"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        convoJSON.unreadMsgCount = convoJSON.user2UnreadMsgCount;
        convoJSON.lastMessageOtherUserSaw = convoJSON.user1LastMessageIdSeen;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        convoJSON.unreadMsgCount = convoJSON.user1UnreadMsgCount;
        convoJSON.lastMessageOtherUserSaw = convoJSON.user2LastMessageIdSeen;
        delete convoJSON.user2;
      }

      delete convoJSON.user1LastMessageIdSeen;
      delete convoJSON.user2LastMessageIdSeen;
      delete convoJSON.user1UnreadMsgCount;
      delete convoJSON.user2UnreadMsgCount;
      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { userIdThatSawMessage, messageId, conversationId } = req.body;
    const conversation = await Conversation.findOne({
      where: { id: conversationId }
    });

    if (userIdThatSawMessage === conversation.user1Id) {
      // user 1 saw message
      await conversation.update({
        user1UnreadMsgCount: 0,
        user1LastMessageIdSeen: messageId
      });
    } else {
      // user 2 saw message
      await conversation.update({
        user2UnreadMsgCount: 0,
        user2LastMessageIdSeen: messageId
      });
    }

    res.json(conversation);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
