import { Router } from "express";
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} from "../controllers/usuarios.controller.js";
import {
    getCuerposColegiadosUsuario,
    createMiembroCuerpoColegiado,
    deleteMiembroCuerpoColegiado,
    updateMiembroCuerpoColegiado,
} from "../controllers/miembros_cuerpos_colegiados.controller.js";

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuario);
router.post("/", createUsuario);
router.delete("/:id", deleteUsuario);
router.patch("/:id", updateUsuario);

router.get("/:id/cuerpos_colegiados", getCuerposColegiadosUsuario);
router.post("/cuerpos_colegiados", createMiembroCuerpoColegiado);
router.delete("/cuerpos_colegiados/:id1/:id2", deleteMiembroCuerpoColegiado);
router.patch("/cuerpos_colegiados/:id1/:id2", updateMiembroCuerpoColegiado);

export default router;
