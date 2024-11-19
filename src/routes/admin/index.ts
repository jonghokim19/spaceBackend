import express from "express";
import counselor from './counselor/index';
import inquire from './inquire/index';
import setting from './setting/index';
import visitor from './visitor/index';
import blockIp from './blockIp/index';
import token from './token/index';
import user from './user/index';

const router = express.Router();

router.use('/counselor', counselor);
router.use('/inquire', inquire);
router.use('/visitor', visitor);
router.use('/setting', setting);
router.use('/blockIp', blockIp);
router.use('/token', token);
router.use('/user', user);

export default router;