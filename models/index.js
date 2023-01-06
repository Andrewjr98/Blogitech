const users = require('./users');
const post = require('./post');

users.hasMany(post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

post.belongsTo(users, {
    foreignKey: 'user_id'
});

module.exports = { users, post};