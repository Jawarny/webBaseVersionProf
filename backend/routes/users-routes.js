const express = require('express');

const usersController = require('../controllers/users-controller');
const router = express.Router();

// Middleware pour obtenir toutes les tâches
//liste de users
router.get('/', usersController.getUsers);

router.get('/profile/:uid', usersController.getUserById);

router.post('/register', usersController.registerUser);
// list
router.post('/login', usersController.login);

router.patch('/profile/:uid', usersController.updateUserById);

module.exports = router;
