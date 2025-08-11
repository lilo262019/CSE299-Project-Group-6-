const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');

router.delete('/:id', verifyToken,userController.deleteUser);
router.get('/:id', verifyToken, userController.getUser);

module.exports = router;