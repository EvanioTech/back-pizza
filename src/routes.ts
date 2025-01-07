import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";

import uploadConfig from './config/multer'

const upload = multer(uploadConfig.upload('./tmp'));

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

// ROTAS PRODUCTS

router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle);

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);


// ROTAS ORDERS  

router.post("/order", isAuthenticated, new CreateOrderController().handle);








export default router;