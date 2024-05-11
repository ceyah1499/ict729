import express from 'express';
import * as scheduleController from '../controllers/schedule.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', authController.verifyToken, scheduleController.getSchedules);
router.get('/:id', scheduleController.getSchedule);
router.post('/', scheduleController.createSchedule);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

export default router;