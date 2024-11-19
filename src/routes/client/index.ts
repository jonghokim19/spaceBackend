import express from 'express';
import inquire from './inquire/index';
import home from './home/index';
import location from './location/index';

const router = express.Router();

router.use('/inquire', inquire);
router.use('/home', home);
router.use('/location', location);

export default router;
