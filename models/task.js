const mongo=require('mongoose');

const Task = new mongo.Schema({
    _id: {
        type: mongo.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    subtask: {
        type: [mongo.Schema.Types.ObjectId],
        ref: 'Task'
    },
    done: {
        type: Boolean,
        default: false
    },
    progress: {
        type: Number,
        range: [0, 100],
        default: 0
    },
    createdAt: {
        type: mongo.Schema.Types.Date,
        default: Date.now
    },
    dueDate:{
        type: mongo.Schema.Types.Date,
    }
});

module.exports = mongo.model('task', Task);
