import { Router } from "express";
import { AppController } from "../controller/appController";

const router = Router();
const appController = new AppController();

// Exercício 1
router.get("/users/:id", (req, res) => appController.getUserById(req, res));
// Exercício 2
router.get("/users/age-range/search", (req, res) => appController.getUsersByAgeRange(req, res));
// Exercício 3
router.post("/posts", (req, res) => appController.createPost(req, res));
// Exercício 4
router.put("/users/:id", (req, res) => appController.updateUser(req, res));
// Exercício 5
router.patch("/posts/:id", (req, res) => appController.updatePostPartial(req, res));
// Exercício 6
router.delete("/posts/:id", (req, res) => appController.deletePost(req, res));
// Exercício 7
router.delete("/users/cleanup-inactive", (req, res) => appController.cleanupInactive(req, res));

export default router;
