import { Router } from 'express';
import * as userController from 'controllers/user';


const router = new Router();

// Health check
router.get('/api/health-check', (req, res) => {
  res.send('ok');
});

// CRUD users
router.post('/api/users', userController.create );
router.patch('/api/users/:id', userController.update );
router.put('/api/users/:id', userController.update );
router.get('/api/users/:id', userController.get );
router.get('/api/users', userController.list );
router.delete('/api/users/:id', userController.remove );

// Auth APIs
router.post('/api/login', () => {});
router.post('/api/signup', () => {});
router.post('/api/session', () => {});

export default router;
