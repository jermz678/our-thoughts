const router = require('express').Router();
const  Thought = require('../../model/Thought')


//find all thoughts
router.get('/', (req, res) => {
    Thought.find({   
    })
    .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
    })
});

 //find thought by ID
 router.get('/:id', ({ params }, res) => {
    Thought.findOne(
        { _id: params.id}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
           .catch(err => {
               console.log(err);
               res.status(400).json(err);
        });
})

//create new thought
router.post('/', ({ body }, res) => {
    Thought.create(body)
    .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
    });
})

 //Delete thought by ID
 router.delete('/:id', ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.id})
   .then(dbThoughtData => {
       if (!dbThoughtData) {
           res.status(404).json({ message: 'No Thought with this id' });
           return;
       }
   res.json(dbThoughtData);
 })
 .catch(err => res.status(400).json(err));
})



module.exports = router;