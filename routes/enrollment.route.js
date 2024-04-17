import express from 'express';
import * as enrollmentController from '../controllers/enrollment.controller.js';

const router = express.Router();

router.get('/', enrollmentController.getEnrollments);
router.get('/:id', enrollmentController.getEnrollment);
router.post('/', enrollmentController.createEnrollment);
router.put('/:id', enrollmentController.updateEnrollment);
router.delete('/:id', enrollmentController.deleteEnrollment);

export default router;