const names = [
    'Aaron',
    'Abdul',
    'Smith',
    'Jones',
    'Zenith',
    'Zennon',
    'Zion',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];

const thoughtText = [
    'I love pasta',
    'Help me find My Phone',
    'I want to Learn Piano',
    'Starbase Defender: the new starbucks drink',
    'Balloon Tower Defense is the best',
    'You can call me, Monopoly Money Manager',
    'Movie trailers about trailers are ridiculous',
    '"Hello world" is so elementary!',
    'Stupid Social Media App, never going back!',
    'Notes from my child make me cringe',
    'Green Text Messages are gross',
    'Email my mom if you need me!',
    'My Compass broke while hiking!',
    'Firefox, the new Ari Skin',
    'Running multiple apps bogs my computer down!',
    'The best cooking app is Recibeet!',
    'Poker face, po-po-poker face',
    'Deliveries from Amazon always make my day!',
];

const reactions = [
    'Ooh la la la',
    'Boo!',
    'Yes!',
    'No',
    'Disagree',
    'Nay!',
    'Agreed!!',
    'Love it!',
    'Oof.gif',
    'What a bad batch!',
    'The best!',
    'You are wrong',
    'You are the worst',
    'Unfollowed',
    'Reported',
]



//get a random item 
const getRandItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

//get a random name using random number
const getName = () =>
    `${getRandItem(names)}`;

//get random post text
const getRandThought = (int) => {
    const results = [];
    for (let i=0; i< int; i++) {
        results.push({
            thoughtText: getRandItem(thoughtText),
            username: getRandItem(names)
        });
    }
    return results
};

//get random reaction text
const getRandReaction = (int) => {
    const results = [];
    for (let i=0; i< int; i++) {
        results.push({
            reactionBody: getRandItem(reactions),
            username: getRandItem(names)
        });
    }
    return results
};


//get random friends
const getRandFriend = (int) =>{
    const results =[];
    for(let i=0; i< int; i++){
        results.push({
            friends: getRandItem(names)
        });
    }
    return results
};

module.exports = {getName, getRandThought, getRandReaction, getRandFriend}