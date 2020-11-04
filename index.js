console.log("This is my first node application.");

const e = require('express');
const express = require('express');
const app = express();
const port = 3000;
let dataObj = require("./data.json");
app.use(express.json());

function getTodos(req, res){
    let data = dataObj;
    let response = {todo: data};
    res.send(response);
}

function addTodo(req, res){

    let data = dataObj;

    let allIds = data.map(function (todo) {
        return todo.id;
    });

    let maxId = Math.max.apply(Math, allIds) + 1;

    let newTodo = {
        completed: req.body.completed, 
        id: maxId, 
        name: req.body.name,
    }; 
    data.push(newTodo);
    // console.log(newTodo);

    let response = { todos: data };

    res.send(response);
}

function updateTodo(req, res) {
    let data = dataObj;

    let ifExists = data.some(function (todo) {
        if(todo.id === req.body.id) {
            return todo;
        }
    });

    if (!ifExists) {
        let response = { message: "Element does not exists"};

        res.send(response); 
    } else {

        let newData = data.map(function (todo){
            if (todo.id === req.body.id) {
                todo.name = req.body.name;
                todo.completed = req.body.completed;

                return todo;
            }         
        });

        dataObj = newData;

        let response = { todos: dataObj };

        res.send(response);
    }
}

function deleteTodo(req, res){
    let data = dataObj;

    let ifExists = data.some(function (todo) {
        if (todo.id === req.body.id) {
            return todo;
        }
    }); 

    if (!ifExists) {
        let response = { message: "Todo does not exists"};

        res.send(response)
    } else {
        
        let newData = data.filter(function(todo) {
            if (todo.id !== req.body.id) {
                return todo;
            }
        });

        dataObj = newData; 

        let response = { todos: dataObj };

        res.send(response);
    }
}

app.get("/todo", getTodos);
app.post("/todo", addTodo);
app.put("/todo", updateTodo);
app.delete("/todo", deleteTodo);

// function reqGet(req,res){
//     res.send("Hello World");
// }

function reqGetUser(req, res){
    let name = req.query.name;
    let response = {name: name};
    res.send(response);
}

// app.get("/", reqGet);
// app.get("/user", reqGetUser);

function appStart(){
    console.log("To-do-api listening at "+port);
}

app.listen(port, appStart);

