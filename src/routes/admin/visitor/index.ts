import express from "express";
import visitor from './visitor';

const router = express.Router();

router.use('/', visitor);

export default router;