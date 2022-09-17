import { Router } from "express";
import productosRouter from "./productsRoutes.js";
/* import carritosRouter from "./CarritosRoutes.js"; */
import registerRouter from "./registerRoutes.js";
import loginRouter from "./loginRoutes.js";
import logoutRouter from "./logoutRoutes.js";

const apiRouter = Router();

apiRouter.use("/register", registerRouter);
apiRouter.use("/login", loginRouter);
apiRouter.use("/products", productosRouter);
/* apiRouter.use("/carritos", carritosRouter); */
apiRouter.use("/logout", logoutRouter);

export default apiRouter;
