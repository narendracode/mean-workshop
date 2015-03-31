var express = require('express');
var router = express.Router();
var userController = require('../app/user/controllers/UserController');

/* GET users listing. */
router.get('/',userController.getAll);

/* CREATE new User */
router.post('/',userController.create);

/* GET a user with id */
router.get('/:id', userController.get);

/* UPDATE user with id */
router.put('/:id',userController.update);

router.delete('/:id',userController.delete);

module.exports = router;
