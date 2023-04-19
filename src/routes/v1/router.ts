import express from 'express';
import triggerDevicesController from '../../controllers/trigger-devices.js';

const router = express.Router();

router.post('/devices', triggerDevicesController.post);

export default router;
