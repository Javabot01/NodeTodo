//jshint esversion:8
const { body, query, param } = require('express-validator');

const VALIDATORS = {
    TODO: {
        CreateTodo:
            [
                body('name').exists().withMessage("Name is required").isString().withMessage("Must be a string").notEmpty()
            ],
        GetTodo:
            [
                query('id').exists().withMessage("Id is required").isMongoId().withMessage('Id passed is invalid')
            ],
        GetTask:
            [
                query('idTask').exists().withMessage("Id is required")
            ],
        UpdateTodo:
            [
                param('id').exists().withMessage("Id is required").isMongoId().withMessage("Id is invalid"),
                body('name').exists().withMessage("Name is required").isString().withMessage("Must be a string"),
                body('done').exists().withMessage("Done must be string")
            ],
        DeleteTodo:
            [
                param('id').exists().withMessage("Id is required").isMongoId().withMessage("Id passed is invalid"),
            ]
    }
};

module.exports = VALIDATORS;