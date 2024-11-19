import express from "express";
import location from './location';

const router = express.Router();

router.use('/', location);

export default router;