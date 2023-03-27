const connection = require('../config/connection');
const {Thought, User} = require('../models');
const{getName, getRandThought, getRandReaction, getRandFriend} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('~~~~~~~~~~~~~Connected~~~~~~~~~~~~~~~~~~~~~~~');

    //drop existing thoughts
    await Thought.deleteMany({});

    //drop existing users
    await User.deleteMany({});

    //create an empty arr to hold users
    const users = [];
    const thoughts =[];
    const reactArr = [];

    //loop 10 times and add users to the users array
    for(let i = 0; i < 10; i++){
        //get a random thought and reaction using helper funct

        const thought = getRandThought(10);
        const thoughtText = thought;
        const reactionBody= getRandReaction(10);
        const reactions = reactionBody;
        const friends = getRandFriend(7);

        const username =  getName();

        users.push({
            username,
            thought,
            friends
        });

        thoughts.push({
            thoughtText,
            username,
            reactions
        });

        reactArr.push({
            reactionBody,
            username
        });
    }

    //add users to the collection and await results
    await User.collection.insertMany(users);

    //add thoughts to the collection and await results
    await Thought.collection.insertMany(thoughts);

    //add reactions to the colletion and await results
    await Thought.collection.insertMany(reactArr);

    console.table(users);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of table~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.table(thoughts);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of table~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.table(reactArr);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of table~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.info('🌱 Seeding is now complete, good job! 🌱');
    process.exit(0);
});