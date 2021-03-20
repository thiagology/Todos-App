const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: String,
    isDone: Boolean,
    userId: String
}, {
    timestamps: true
});

const TodoModel = mongoose.model('todo', TodoSchema);

module.exports = TodoModel;