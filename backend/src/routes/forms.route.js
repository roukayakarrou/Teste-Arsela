const express = require("express");
const { createForm, readForm, deleteForm, getForms } = require("../controllers/forms.controller")

const router = express.Router();

router.post("/form", createForm)
router.get("/form/:id", readForm)
router.delete("/form/:id", deleteForm)
router.post("/my/forms", getForms)

module.exports = router;