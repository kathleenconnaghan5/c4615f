const Conversation = require("./conversation");
const UserConversation = require("./user-conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.hasMany(Conversation);
// Conversation.belongsTo(User, { as: "user1" });
// Conversation.belongsTo(User, { as: "user2" });
UserConversation.belongsTo(User, { as: "userId" } );
UserConversation.belongsTo(Conversation, { as: "conversationId" } )
Conversation.hasMany(UserConversation);
User.hasMany(UserConversation);
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  UserConversation
};
