// Define os endpoints da API e mapeia URLs para os controladores.
import { Router } from "express";
import { getUser, createUser, loginUser, deleteUser } from "../controllers/userController";

const router = Router();

// Definir as rotas e associá-las aos controladores
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

export default router;