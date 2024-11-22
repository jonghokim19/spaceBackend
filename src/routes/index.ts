import express from 'express';
import admin from './admin';
import client from './client/index';

const router = express.Router();

router.use('/api/client', client);
router.use('/api/admin', admin);

export default router;
