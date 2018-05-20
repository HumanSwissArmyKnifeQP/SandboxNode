const TodoService = require('../services/todo.service')

_this = this

exports.getTodos = async function(req, res, next){

    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        const todos = await TodoService.getTodos({}, page, limit)
        return res.status(200).json({status: 200, data: todos, message: "Successfully retrieved ToDos"});
        
    }catch(e){
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createTodo = async function(req, res, next){

    const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        date: req.body.date
    }

    try{
        const createdTodo = await TodoService.createTodo(todo);
        return res.status(201).json({status: 201, data: createdTodo, message: "Successfully created ToDo"})
    }catch(e){
        
        return res.status(400).json({status: 400, message: "Todo creation was unsuccessful"})
    }
}

exports.updateTodo = async function(req, res, next){

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

exports.removeTodo = async function(req, res, next){

    const id = req.params.id;

    try{
        const deleted = await TodoService.deleteTodo(id)
        return res.status(204).json({status:204, message: "Successfully deleted ToDo"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}