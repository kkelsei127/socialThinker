const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userID/friends
router.route('/:userId/friends').post(addFriend);

// /api/users/:userID/friends/:friendID
router.route('/:userId/friends/:friendId').delete(removeFriend);


module.exports = router;