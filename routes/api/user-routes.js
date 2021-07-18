const router = require('express').Router();

const {
    getAllUser,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

router
    .route('/')
    .get(getAllUser)
    .post(createUser);

router  
    .route('/:id')
    .get(getUserbyID)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:id/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend)

module.exports = router;

