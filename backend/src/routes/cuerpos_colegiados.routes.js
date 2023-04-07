import { Router } from "express";
import {
    getCuerposColegiados,
    getCuerpoColegiado,
    createCuerpoColegiado,
    updateCuerpoColegiado,
    deleteCuerpoColegiado,
} from "../controllers/cuerpos_colegiados.controller.js";

import {
    getMiembrosCuerpoColegiado,
    createMiembroCuerpoColegiado,
    deleteMiembroCuerpoColegiado,
    updateMiembroCuerpoColegiado
} from "../controllers/miembros_cuerpos_colegiados.controller.js";

const router = Router();

router.get("/", getCuerposColegiados);
router.get("/:id", getCuerpoColegiado);
router.post("/", createCuerpoColegiado);
router.delete("/:id", deleteCuerpoColegiado);
router.patch("/:id", updateCuerpoColegiado);

router.get("/:id/miembros", getMiembrosCuerpoColegiado);
router.post("/miembros", createMiembroCuerpoColegiado);
router.delete("/miembros/:id1/:id2", deleteMiembroCuerpoColegiado);
router.patch("/miembros/:id1/:id2", updateMiembroCuerpoColegiado);

export default router;
