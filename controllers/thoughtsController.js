const { Thoughts, User, Reactions } = require('../models');
const { ObjectId } = require('mongoose').Types;

//aggregate function to get number of reactions overall
const reactionCount = async () =>
    Thoughts.aggregate()
    .count('reactionCount')
    .then((numberOfReactions) => numberOfReactions);

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                    // reactionCount: await reactionCount(),
                };
                console.log(thoughtObj);
                return res.json(thoughtObj)})
            .catch((err) => res.status(500).json(err));
    },
    //get a thought
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtsId })
        .select('-__v')
        .then(async (thought) =>
            !thought
                ? res.status(404).json({ message: 'no thoughts found with that id'})
                : res.json({
                    thought,
                    reactionCount: await reactionCount(req.params.thoughtId),
                })
                )
                .catch((err) => res.status(500).json(err));
    },
    //create a thought
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //delete a thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtsId})
            .then((thought) =>
            !thought    
                ? res.status(404).json({message: 'no thought found with that id'})
                : Thoughts.deleteMany({ _id: { $in: thought.user} })
            )
            .then(() => res.json({ message: 'Thought deleted'}))
            .catch((err) => res.status(500).json(err));
    },
    // //update a thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtsId},
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
    async createReaction(req, res) {
        try {
            const reaction =  await Reactions.create(req.body)
            console.log(reaction)
            const thought = await Thoughts.findOneAndUpdate(
                {_id: req.params.thoughtsId},
                { $addToSet: {reactions: reaction._id} },
                {runValidators: true, new: true}
            )
            console.log(thought);
            !thought ? res.status(404).json({ message: 'no thought found with this id'})
            : res.json(thought)
        } catch(err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    //delete a reaction
    deleteReaction(req, res) {
        Reactions.findOneAndRemove({ _id: req.params.reactionsId})
        .then((reactiondata) =>
            !reactiondata
                ? res.status(404).json({message: 'no reaction found with that id'})
                : Thoughts.findOneAndUpdate(
                    { reactions: req.params.reactionsId },
                    { $pull: { reactions: req.params.reactionsId }},
                    {new: true}
                )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'Reaction deleted, but no thoughts found'
                    })
                    : res.json({ message: 'Successfully removed reaction'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};