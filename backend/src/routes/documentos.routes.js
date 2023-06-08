import { Router } from "express";
import {
    getDocumentos,
    getDocumento,
    createDocumento,
    updateDocumento,
    deleteDocumento,
} from "../controllers/documentos.controller.js";
import {
    getReferencias,
    getReferidos,
    createReferencia,
    deleteReferencia,
    updateReferencia,
} from "../controllers/referencias.controller.js";

const router = Router();

router.get("/", getDocumentos);
router.get("/:id", getDocumento);
router.post("/", createDocumento);
router.delete("/:id", deleteDocumento);
router.patch("/:id", updateDocumento);

router.get("/:id/referencias", getReferencias);
router.get("/:id/referidos", getReferidos);
router.post("/referencias", createReferencia);
router.delete("/referencias/:id1/:id2", deleteReferencia);
router.patch("/referencias/:id1/:id2", updateReferencia);

export default router;
