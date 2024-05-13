import express from 'express';
import * as scheduleController from '../controllers/schedule.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', authController.verifyToken, scheduleController.getSchedules);
router.get('/:id', authController.verifyToken, scheduleController.getSchedule);
router.post('/', authController.verifyToken, scheduleController.createSchedule);
router.put('/:id', authController.verifyToken, scheduleController.updateSchedule);
router.delete('/:id', authController.verifyToken, scheduleController.deleteSchedule);

export default router;