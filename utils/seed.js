const connection = require('../config/connection');
const {Thoughts, User} = require('../models');
const{getName, getRandThought, getRandReaction, getRandFriend, getRandDomain} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('~~~~~~~~~~~~~Connected~~~~~~~~~~~~~~~~~~~~~~~');

    

    //drop existing users
    await User.deleteMany({});

    //drop existing thoughts
    await Thoughts.deleteMany({});

    //create an empty arr to hold users
    const users = [];
    const thoughtArr =[];
    const reactArr = [];

    //loop 10 times and add users to the users array
    for(let i = 0; i < 10; i++){
        //get a random thought and reaction using helper funct

        const thought = getRandThought(3);
        const thoughtText =  thought;
        // const reactionBody= getRandReaction(3);
        const reactions = getRandReaction(10);
        const friends = getRandFriend(9);
        const username =  getName();
        const domain = getRandDomain();
        const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@${domain}.com`;

        users.push({
            username,
            email,
            thought,
            friends

        });

        thoughtArr.push({
            thoughtText,
            username,
            reactions
        });

        // reactArr.push({
        //     reactionBody,
        //     username
        // });
    }

    

    // add thoughts to the collection and await results
    await Thoughts.collection.insertMany(thoughtArr);

    // //add reactions to the colletion and await results
    // await Thoughts.collection.insertMany(reactArr);

    //add users to the collection and await results
    await User.collection.insertMany(users);

    console.table(users);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of table~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.table(thoughtArr);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of table~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // console.table(reactArr);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of table~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.info('🌱 Seeding is now complete, good job! 🌱');
    process.exit(0);
});