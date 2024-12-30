import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";



const router = Router();
// rotas User
router.post("/users", new CreateUserController().handle);
// rotas Auth
router.post("/session", new AuthUserController().handle);



export default router;