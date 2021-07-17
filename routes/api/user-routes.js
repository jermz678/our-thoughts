const router = require('express').Router();

const {
    getAllUser,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser
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

module.exports = router;




  //add a new friend to a user friend list
router.post(':userId/friends/:friendId', ({ params}, res) => {
    User.findOneAndUpdate({ _id: params.id })
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { friends: _id} },
            { new: true }
        );
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User with this id' });
            return;
        }
    res.json(dbUserData);
  })
  .catch(err => res.status(400).json(err));
})


//delete a friend
router.delete(':userId/friends/:friendId', ({ params}, res) => {
    User.findOneAndDelete({ _id: params.id })
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $pull: { friends: _id} },
            { new: true }
        );
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User with this id' });
            return;
        }
    res.json(dbUserData);
  })
  .catch(err => res.status(400).json(err));
})

module.exports = router;
