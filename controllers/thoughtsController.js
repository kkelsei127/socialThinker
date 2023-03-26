const { Thought, User } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //get a thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.courseId })
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'no thoughts found with that id'})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    },
    //create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //delete a thought
    deleteThought(req, res) {
        Thought.findneAndDelete({ _id: req.params.thoughtId})
            .then((thought) =>
            !thought    
                ? res.status(404).json({message: 'no thought found with that id'})
                : Thought.deleteMany({ _id: { $in: thought.users} })
            )
            .then(() => res.json({ message: 'Thought and user deleted'}))
            .catch((err) => res.status(500).json(err));
    },
    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body},
            { runValidators: true, new: true}
        )
        .then((thought) =>
        !thought    
            ? res.status(404).json({ message: 'no thought found with this id'})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.reactionId},
            { $set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'no thought found with this id'})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete a reaction
    deleteReaction(req, res) {
        Thought.findneAndDelete({ _id: req.params.reactionId})
            .then((thought) =>
            !thought    
                ? res.status(404).json({message: 'no thought found with that id'})
                : Thought.deleteMany({ _id: { $in: thought.users} })
            )
            .then(() => res.json({ message: 'Thought and user deleted'}))
            .catch((err) => res.status(500).json(err));
    },
};