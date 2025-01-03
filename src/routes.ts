import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

// ROTAS USER

const router = Router();
// rotas User
router.post("/users", new CreateUserController().handle);
// rotas Auth
router.post("/session", new AuthUserController().handle);
// rota detalhes do usuario
router.get("/me", isAuthenticated, new DetailUserController().handle);

// ROTAS CATEGORY




export default router;