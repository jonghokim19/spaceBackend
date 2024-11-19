import express from "express";
import setting from './setting';

const router = express.Router();

router.use('/', setting);

export default router;