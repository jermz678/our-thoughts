const  { Thought, User } = require('../model/')

const thoughtController = {

     //find all thoughts
     getAllThoughts(req, res){
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //find thought by ID
    getThoughtbyID({ params }, res) {
        Thought.findOne({ _id: params.id})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
        });
    },

    //create new Thought
    createThought({ params, body }, res){
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id} },
                { new: true }
            );
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

     //update Thought
     updateThought ({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //delete Thought
    deleteThought({ params },res) {
        Thought.findOneAndDelete({ _id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtrData) {
                    res.status(404).json({ message: 'No Thought with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
}

module.exports = thoughtController;