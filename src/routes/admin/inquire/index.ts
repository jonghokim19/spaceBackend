import express from "express";
import inquire from './inquire';

const router = express.Router();

router.use('/', inquire);

export default router;