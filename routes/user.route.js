const { addUser, getUser, getUsers, getSingleUser } = require('../controllers/user.controller');
const router = require('express').Router();

router.post('/add', addUser);
router.post('/get', getUser);
router.get('/:loggedInUserId', getUsers);
router.get('/get/:userId', getSingleUser);

module.exports = router;
