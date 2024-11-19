import express from 'express';
import admin from './admin';
import client from './client/index';

const router = express.Router();

router.use('/client', client);
router.use('/admin', admin);

export default router;
