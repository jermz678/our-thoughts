const { User } = require('../model')

const userController = {

    //find all users
    getAllUser(req, res){
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //find user by ID
    getUserbyID({ params }, res) {
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
    },

    //create new user
    createUser({ body }, res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //update user
    updateUser ({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //delete user
    deleteUser({ params },res) {
        User.findOneAndDelete({ _id: params.id})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //add a friend to user
    addFriend({ params, body },res){
        User.findOneAndUpdate(
            { _id: params.Id },
            { $push: { friends: body} },
            {new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //delete a friend from user
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.Id },
            { $pull: { friends: {friends: params.friends} } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }


};

module.exports = userController;