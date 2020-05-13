//jshint esversion:8
const express = require('express');
const { validateRequest } = require('./../libs/request-validator');
const { TODO } = require('./../libs/validators');
const { Task } = require('./../models/task');

const router = express.Router();

router.post('/create', ...TODO.CreateTodo, validateRequest, (req, res) => {
    // console.log('Todo Created');

    const task = new Task(res.locals.data);
    task.save().then((doc) => {
        res.send(doc);
    });
});

router.get('/all', (req, res) => {
    Task.find().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(503).send({ message: "Services Unavailable" });
        console.log(err);

    });
});
router.get('/one', ...TODO.GetTodo, validateRequest, (req, res) => {
    Task.findById(res.locals.data.id).then((doc) => {
        if (!doc) {
            res.status(404).send({ message: 'Todo not found' });
        }
        res.status(200).send(doc);
    }).catch((err) => {
        res.status(503).send({ message: "Services Unavailable" });
    });
});

router.patch('/update/:id', ...TODO.UpdateTodo, validateRequest, (req, res) => {
    Task.findByIdAndUpdate(req.params.id, {
        name: res.locals.data.name,
        done: res.locals.data.done
    }, {
        new: true
    }).then((doc) => {
        if (!doc) {
            res.status(404).send({ message: 'Todo not found' });
        }
        res.status(201).send(doc);
    }).catch((err) => {
        res.status(503).send({ message: "Services Unavailable" });
    });
});


router.delete('/delete/:id', ...TODO.DeleteTodo, validateRequest, (req, res) => {
    Task.findByIdAndDelete(req.params.id).then((doc) => {
        // console.log(doc);

        if (!doc) {
            res.status(404).send({ message: 'Todo not found' });
        }
        // console.log("Document deleted", doc);
        res.send({ message: 'Todo successfully deleted' });
    }).catch((err) => {
        res.status(503).send({ message: "Services Unavailable" });
    });
});
// router.delete('/delete/:idTask', ...TODO.DeleteTask, validateRequest, (req, res) => {
//     // delid();
//     List.deleteMany(req.params).then((doc) => {
//         console.log(doc);
//         if (!doc) {
//             res.status(404).send({ message: 'Todo not found' });
//         }
//         console.log("Document deleted", doc);
//         res.send({ message: 'Todo successfully deleted' });
//     }).catch((err) => {
//         res.status(503).send({ message: "Services Unavailable" });
//     });
// });
exports.TodoRouter = router;