import { Router } from 'express';
import * as userController from 'controllers/user';
import * as authController from 'controllers/auth';
import {
  requireRoles,
  loggedInOnly,
} from 'helpers/session';


const adminOnly = requireRoles([ 'admin' ]);

const router = new Router();

// Health check
router.get('/', (req, res) => {
  res.send('ok');
});

// CRUD users
router.post('/api/users', userController.create );
router.patch('/api/users/:id', userController.update );
router.get('/api/users/:id', userController.get );
router.get('/api/users', userController.list );
router.delete('/api/users/:id', userController.remove );

// Auth APIs
router.post('/api/signup', authController.signup );
router.post('/api/login', authController.login );
router.get('/api/logout', authController.logout );
router.get('/api/session', authController.session );

// Protected APIs
router.get('/api/admin/users', adminOnly, userController.list );
router.get('/api/member/users', loggedInOnly, userController.list );

export default router;
