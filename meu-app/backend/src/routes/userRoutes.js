// Define os endpoints da API e mapeia URLs para os controladores.
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/users', userController.getAllUsers);

module.exports = router;
