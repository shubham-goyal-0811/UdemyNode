const express = require('express');
const Router = express.Router();
const userControllers = require('../controllers/userController');


Router.route('/').get(userControllers.getallusers).post(userControllers.createuser);
Router.route('/:id').get(userControllers.getUser).patch(userControllers.updateUser).delete(userControllers.deleteUser);

module.exports = Router;