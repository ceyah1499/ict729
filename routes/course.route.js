import express from 'express';
import * as courseController from '../controllers/course.controller.js';

const router = express.Router();

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

export default router;