const Sequelize = require("sequelize");
const db = require("../db");

const UserConversation = db.define("user-conversation", {
  lastMessageIdSeen: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  unreadMsgCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});


UserConversation.findConversation = async function (conversationId, userId) {
  const userConversation = await UserConversation.findAll({
    where: {
      conversationId: conversationId,
      userId: userId,
      },
  })

  return userConversation;
};

module.exports = UserConversation;
