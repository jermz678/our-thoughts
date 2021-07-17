const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtbyID,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtbyID)
    .put(updateThought)
    .delete(deleteThought);


module.exports = router;