//jshint esversion:8
const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    done: {
        default: false,
        type: Boolean
    },
    trash: {
        default: false,
        type: Boolean
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Todos', TaskSchema, "task");

// const task = new Task({
//     name: "oKay Barrlly"
// });

// task.save().then((doc) => {
//     console.log(doc);
// });

module.exports = {
    Task
};
