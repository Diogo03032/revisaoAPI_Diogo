import { Request, Response } from "express";
import { AppBusiness } from "../business/appBusiness";

const appBusiness = new AppBusiness();

export class AppController {
  // Exercício 1
  getUserById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const user = appBusiness.getUserById(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
  }

  // Exercício 2
  getUsersByAgeRange(req: Request, res: Response) {
    const min = parseInt(req.query.min as string);
    const max = parseInt(req.query.max as string);
    res.json(appBusiness.getUsersByAgeRange(min, max));
  }

  // Exercício 3
  createPost(req: Request, res: Response) {
    const { title, content, authorId } = req.body;
    const newPost = appBusiness.createPost(title, content, authorId);
    res.status(201).json(newPost);
  }

  // Exercício 4
  updateUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { name, email, role, age } = req.body;
    const updated = appBusiness.updateUser(id, { name, email, role, age });
    if (!updated) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(updated);
  }

  // Exercício 5
  updatePostPartial(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const updated = appBusiness.updatePostPartial(id, req.body);
    if (!updated) return res.status(404).json({ message: "Post não encontrado" });
    res.json(updated);
  }

  // Exercício 6
  deletePost(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userId = parseInt(req.header("User-Id") || "0");
    const success = appBusiness.deletePost(id, userId);
    if (!success) return res.status(403).json({ message: "Não autorizado ou post inexistente" });
    res.json({ message: "Post removido com sucesso" });
  }

  // Exercício 7
  cleanupInactive(req: Request, res: Response) {
    if (req.query.confirm !== "true") {
      return res.status(400).json({ message: "Confirmação obrigatória" });
    }
    const removed = appBusiness.cleanupInactive();
    res.json({ removed });
  }
}
