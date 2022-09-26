import { Router } from "express";
import productosRouter from "./productsRoutes.js";
import carritosRouter from "./carritosRoutes.js";
import registerRouter from "./registerRoutes.js";
import loginRouter from "./loginRoutes.js";
import logoutRouter from "./logoutRoutes.js";
import sessionRouter from './sessionRouter.js';
import orderRouter from './orderRoutes.js';

const apiRouter = Router();

apiRouter.use("/register", registerRouter);
apiRouter.use("/login", loginRouter);
apiRouter.use("/products", productosRouter);
apiRouter.use("/carts", carritosRouter);
apiRouter.use("/logout", logoutRouter);
apiRouter.use("/session", sessionRouter);
apiRouter.use("/send-order", orderRouter);

export default apiRouter;
