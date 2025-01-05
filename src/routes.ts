import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
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
router.post("/category", isAuthenticated, new CreateCategoryController().handle);

router.get("/category", isAuthenticated, new ListCategoryController().handle);




export default router;