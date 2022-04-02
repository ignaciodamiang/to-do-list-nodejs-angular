const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('./middleware/auth');

// Policies
const FolderPolicy = require('./policies/FolderPolicy');
const TaskPolicy = require('./policies/TaskPolicy');

// Import controllers
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const FolderController = require('./controllers/FolderController');
const TaskController = require('./controllers/TaskController');

// Routes Login and Register
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

// Users
router.get('/api/users', auth, UserController.all);

// Folders
router.get('/api/folders', auth, FolderController.all);
router.get(
  '/api/folders/:folderId',
  auth,
  FolderController.find,
  FolderController.show
);

router.post('/api/folders/new', auth, FolderController.new);

router.patch(
  '/api/folders/:folderId',
  auth,
  FolderController.find,
  FolderController.update
);
router.delete(
  '/api/folders/:folderId',
  auth,
  FolderController.find,
  FolderController.delete
);

// Tasks
router.get('/api/taskstodo/:folderId', auth, TaskController.allToDo);
router.get('/api/tasksdone/:folderId', auth, TaskController.allDone);
router.post('/api/tasks/new', auth, TaskController.new);
router.patch(
  '/api/tasks/:taskId',
  auth,
  TaskController.find,
  TaskController.update
);

router.delete(
  '/api/tasks/:taskId',
  auth,
  TaskController.find,
  TaskController.delete
);

module.exports = router;
