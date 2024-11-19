import express from "express";
import BlockIp from './blockIp';

const router = express.Router();

router.use('/', BlockIp);

export default router;