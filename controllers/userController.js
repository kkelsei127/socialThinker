const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

//aggregate function to get the number of friends overall
const friendCount = async () =>
    User.aggregate()
    .count('userCount')
    .then((numberOfFriends) => numberOfFriends);


module.exports = {
    // get all Users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
                friendCount: await friendCount(),
            };
            return res.json(userObj);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
    },
    //get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
            !user
                ? res.status(404).json({ message: 'No user found with that Id!'})
                : res.json({
                    user,
                    friendCount: await friendCount(req.params.userId),
                })
        )
        .catch((err) => {
            return res.status(500).json(err);
        });
    },
    //create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    },

    //update a user
    updateUser(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body},
            { runValidators: true, new: true},
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'no user found with this id'})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },


    //delete a user and remove their thoughts
    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'That user doesnt exist'})
                    : Thoughts.findOneAndUpdate(
                        { users: req.params.userId},
                        { $pull: { user: req.params.userId } },
                        { new: true}
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'User deleted, but no thoughts found'
                    })
                    : res.json({ message: 'User successfully '})
            )
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    //add a friend to a user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $addToSet: req.body},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that Id!'})
                    : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //remove friend from a user
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true}
        )
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that id'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};