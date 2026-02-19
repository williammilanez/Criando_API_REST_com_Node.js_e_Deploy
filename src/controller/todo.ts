import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class TodoController {
  async getAllTodos(req: Request, res: Response) {
    try {
      const completed = req.query.completed as string | undefined;

      const filter = completed ? { completed: completed === "true" } : {};

      const todos = await prisma.todo.findMany({
        where: filter,
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      return res.status(500).json({ error: "Erro ao listar tarefas" });
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({ error: "O título é obrigatório" });
      }

      const todo = await prisma.todo.create({
        data: {
          title,
          description,
        },
      });

      return res.status(201).json(todo);
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
      return res.status(500).json({ error: "Erro ao criar tarefa" });
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { title, description, completed } = req.body;

      const todoExists = await prisma.todo.findUnique({
        where: { id: Number(id) },
      });

      if (!todoExists) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          completed,
        },
      });

      return res.status(200).json(updatedTodo);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
      return res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const todoExists = await prisma.todo.findUnique({
        where: { id: Number(id) },
      });

      if (!todoExists) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      await prisma.todo.delete({
        where: { id: Number(id) },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
      return res.status(500).json({ error: "Erro ao deletar a tarefa" });
    }
  }
}
