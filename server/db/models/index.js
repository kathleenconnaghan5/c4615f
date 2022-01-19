const Conversation = require("./conversation");
const UserConversation = require("./user-conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User)
// Conversation.belongsTo(User, { as: "user1" });
// Conversation.belongsTo(User, { as: "user2" });
User.belongsToMany( Conversation, { through: UserConversation } )
Conversation.belongsToMany( User, { through: UserConversation } )
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  UserConversation
};


// UserConversation.belongsToMany(User, { as: "userId" } );
// UserConversation.belongsToMany(Conversation, { as: "conversationId" } )