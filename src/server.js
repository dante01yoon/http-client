const express = require("express");
const bodyParser = require("body-parser");
const nanoid = require("nanoid");
const lodash = require("lodash");

const PORT = 8080;

const app = express();
let todos = [];

app.use(bodyParser.json());

app.get("/api/todos", (req, res) => {
  res.send(todos);
})

app.post("/api/todos", (req, res) => {
  const newTodo = {
    completed: false,
    ...req.body,
    id: nanoid(),
  }

  todos.push(newTodo);

  res.status(201);
  res.send(newTodo);
})

app.patch("/api/todos/:id", (req, res) => {
  const updateIndex = lodash.findIndex(
    todos,
    t => t.id === req.params.id,
  )
  const oldTodo = todos[updateIndex];

  const newTodo = {
    ...oldTodo,
    ...req.body,
  }

  todos[updateIndex] = newTodo;

  res.send(newTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter(
    t => t.id !== req.params.id
  );

  res.status(204);
  res.send();
})

app.listen(PORT, () => {
  console.log("app started on port", PORT)
})