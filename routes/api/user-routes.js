const router = require('express').Router();
const  User  = require('../../model/User')


//find all users
router.get('/', (req, res) => {
    User.find({})
    .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
    });
});

 //find user by ID
 router.get('/:id', ({ params }, res) => {
     User.findOne({ _id: params.id})
     .populate({
         path: 'user',
         select: '__v'
     })
     .populate({
         path: 'thought',
         select: '__v'
     })
    .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
    });
});

//create new user
router.post('/', ({ body }, res) => {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
    });
}) 

		
 //Update user by ID
router.post('/:id', ({ params, body }, res) => {
     User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
    .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
    });
})

 //Delete user by ID
router.post('/:id', ({ params }, res) => {
     User.findOneAndDelete({ _id: params.id})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User with this id' });
            return;
        }
    res.json(dbUserData);
  })
  .catch(err => res.status(400).json(err));
})

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
