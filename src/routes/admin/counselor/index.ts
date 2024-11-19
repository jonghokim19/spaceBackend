import express from "express";
import counselor from './counselor';

const router = express.Router();

router.use('/', counselor);

export default router;