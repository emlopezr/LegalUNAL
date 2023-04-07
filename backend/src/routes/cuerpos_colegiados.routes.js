import { Router } from "express";
import {
    getCuerposColegiados,
    getCuerpoColegiado,
    createCuerpoColegiado,
    updateCuerpoColegiado,
    deleteCuerpoColegiado,
} from "../controllers/cuerpos_colegiados.controller.js";

const router = Router();

router.get("/", getCuerposColegiados);
router.get("/:id", getCuerpoColegiado);
router.post("/", createCuerpoColegiado);
router.delete("/:id", deleteCuerpoColegiado);
router.put("/:id", updateCuerpoColegiado);

export default router;