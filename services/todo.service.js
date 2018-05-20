const ToDo = require('../models/todo.model')

_this = this

exports.getTodo = async function(id){   
    try{
        return await ToDo.findById(id);
    } catch(e) {
        throw Error("Error occured while finding the Todo");
    }
}

exports.getTodos = async function(query, page, limit){

    const options = {
        page,
        limit
    }
    
    try {
        const todos = await ToDo.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createTodo = async function(todo){

    const newTodo = new ToDo({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    })

    try{
        const savedTodo = await newTodo.save()
        return savedTodo;
    }catch(e){
        throw Error("Error while creating Todo")
    }
}

exports.updateTodo = async function(todo){
    const id = todo.id
    const oldTodo = null;
    try{
        oldTodo = await ToDo.findById(id);
    }catch(e){
        throw Error("Error occured while finding the Todo")
    }

    // If no old Todo Object exists return false

    if(!oldTodo){
        return false;
    }

    console.log(oldTodo)

    oldTodo.title = todo.title
    oldTodo.description = todo.description
    oldTodo.status = todo.status

    console.log(oldTodo)

    try{
        const savedTodo = await oldTodo.save();
        return savedTodo;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = async function(id){
    
    try{
        const deleted = await ToDo.remove({_id: id});
        return deleted;
    }catch(e){
        throw Error("Error Occured while Deleting the Todo" + e);
    }
}