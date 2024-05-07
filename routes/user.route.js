import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', authController.verifyToken, userController.getUsers);
router.get('/:id', authController.verifyToken, userController.getUser);
router.post('/', authController.verifyToken, userController.createUser);
router.put('/:id', authController.verifyToken, userController.updateUser);
router.delete('/:id', authController.verifyToken, userController.deleteUser);

export default router;