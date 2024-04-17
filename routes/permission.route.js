import express from 'express';
import * as permissionController from '../controllers/permission.controller.js';

const router = express.Router();

router.get('/', permissionController.getPermissions);
router.get('/:id', permissionController.getPermission);
router.post('/', permissionController.createPermission);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

export default router;