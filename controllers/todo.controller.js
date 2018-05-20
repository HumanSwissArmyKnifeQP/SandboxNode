const TodoService = require('../services/todo.service')

_this = this

exports.getTodo = async (req, res, next)=>{

    const id = req.params.id;
    let todo = null;
    try{
        todo = await TodoService.getTodo(id);
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }

    if(!todo){
        return res.status(404).json({status: 404, message: "Could not find ToDo"});
    } else {
        return res.status(200).json({status: 200, data: todo, message: "Sucessfully retrieved ToDo"});
    }
}

exports.getTodos = async (req, res, next)=>{

    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10; 

    try{
        const todos = await TodoService.getTodos({}, page, limit)
        return res.status(200).json({status: 200, data: todos, message: "Successfully retrieved ToDos"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createTodo = async (req, res, next)=>{

    const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        date: req.body.date
    }

    try{
        const createdTodo = await TodoService.createTodo(todo);
        const todoId = createdTodo.id;
        return res.status(201).json({status: 201, id: todoId, message: "Successfully created ToDo"})
    }catch(e){

        return res.status(400).json({status: 400, message: "Todo creation was unsuccessful"})
    }
}

exports.updateTodo = async (req, res, next)=>{

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Missing Id"})
    }

    const id = req.body._id;

    console.log(req.body)

    const todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        const updatedTodo = await TodoService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Successfully updated ToDo"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTodo = async (req, res, next)=>{

    const id = req.params.id;

    try{
        const deleted = await TodoService.deleteTodo(id);
        return res.status(204).json();
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }

}