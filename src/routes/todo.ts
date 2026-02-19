import { Router } from "express";
import { TodoController } from "../controller/todo";

const routerTodo = Router();

const todoController = new TodoController();

routerTodo.get("/api/todos", (req, res) =>
  todoController.getAllTodos(req, res),
);

routerTodo.post("/api/todos", (req, res) =>
  todoController.createTodo(req, res),
);

export default routerTodo;
