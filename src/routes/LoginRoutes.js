import { Router } from "express";
import passport from "passport";
import { usuariosDao as api } from "../daos/index.js";
import logger from "../utils/logger.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(500).json({ message: "error login" });
});
router.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: "/api/login",
    successRedirect: "/api/productos",
  }),
  (req, res) => {
    res.status(201).json({
      message: "Usuario logueado con éxito",
    });
  }
);

export default router;
