// Require schema and model from mongoose
const mongoose = require('mongoose');

var validEmail = function(email) {
    var regEx = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regEx.test(email)
}



// Construct a new instance of the schema class
const userSchema = new mongoose.Schema({
    // Configure individual properties using Schema Types
    username: { type: String, required: true, unique: true, trim: true},
    email: { type: String, required: true, unique: true, 
        validator: [validEmail, 'Please enter a valid email'],
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email']
    },
    // references the thoughts model to gather thoughts
    thought: [Thoughts],
    // references the user model, self reference, to get a list of friends
    friends: [User],
    //THE BELOW COMES FROM A CLASSWORK EXAMPLE--- DONT THINK THIS IS NECESSARY
    // // Use built in date method to get current date
    // lastAccessed: { type: Date, default: Date.now },
    //
     
},
    //Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

 //Create a virtual getter to access the friends portion of the User Model
userSchema.virtual('friend').get(function() {
return this.friends.length;
})

//create a new class from the user model
const User = mongoose.model('User', userSchema);


module.exports = User;
