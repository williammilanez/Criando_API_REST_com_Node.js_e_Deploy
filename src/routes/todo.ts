import { Router } from "express";
import { TodoController } from "../controller/todo";

const routerTodo = Router();

const todoController = new TodoController();

routerTodo.get("/api/todos", (req, res) =>
  todoController.getAllTodos(req, res),
);

export default routerTodo;
