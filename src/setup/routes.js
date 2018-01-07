import { Router } from 'express';
import * as userController from 'controllers/user';
import * as authController from 'controllers/auth';
import {
  requireRoles,
  loggedInOnly,
} from 'helpers/session';


// Admin only middleware
const adminOnly = requireRoles([ 'admin' ]);

const router = new Router();

// Health check
router.get('/api/health-check', (req, res) => {
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

// Admin only
router.get('/api/admin/users', adminOnly, userController.list );
// Logged in only
router.get('/api/member/users', loggedInOnly, userController.list );

export default router;
