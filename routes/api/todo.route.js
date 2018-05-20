const express = require('express')
const router = express.Router()
const ToDoController = require('../../controllers/todo.controller');

router.get('/', ToDoController.getTodos)

router.post('/', ToDoController.createTodo)

router.put('/', ToDoController.updateTodo)

router.delete('/:id',ToDoController.removeTodo)

module.exports = router;