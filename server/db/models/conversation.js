const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const Sequelize = require("sequelize");

const Conversation = db.define("conversation", {

  // No longer needed, the equivalent values are now stores in UserConversation

  // user1LastMessageIdSeen: {
  //   type: Sequelize.INTEGER,
  //   allowNull: true,
  // },
  // user2LastMessageIdSeen: {
  //   type: Sequelize.INTEGER,
  //   allowNull: true,
  // },
  // user1UnreadMsgCount: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 0,
  //   allowNull: false,
  // },
  // user2UnreadMsgCount: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 0,
  //   allowNull: false,
  // },
});

// find conversation given two user Ids

// Conversation.findConversation = async function (user1Id, user2Id) {
//   const conversation = await Conversation.findOne({
//     where: {
//       user1Id: {
//         [Op.or]: [user1Id, user2Id]
//       },
//       user2Id: {
//         [Op.or]: [user1Id, user2Id]
//       }
//     }
//   });

Conversation.findConversation = async function (conversationId) {
  const conversation = await Conversation.findAll({
    where: {
      conversationId: conversationId,
    }
  })

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
