// require('dotenv').config({path: '../config/.env'});
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({

//     username:{
//         type: String
//     },

//     password:{
//         type: String
//     },

//     tokens:[{

//         token:{
//             type: String,
//             required: true
//         }
//     }]
// });

// userSchema.methods.generateAuthToken = async function(){
//     const user = this;

//     const token = await jwt.sign({_id: user._id.toString()},process.env.TOKEN_SECRET);

//     user.tokens = user.tokens.concat({token});

//     await user.save();

//     return token
// };

// userSchema.statics.findByCredentials = async(username, password)=>{

//     const user = await User.findOne({username});

//     if(!user)
//     {
//         throw new Error('Unable to login');
//     }

//     const isMatched = await bcrypt.compare(password, user.password);
    
//     if(!isMatched){
//         throw new Error('Unable to login')
//     }

//     return user;

// }

// userSchema.pre('save', async function(next){

//     const user = this;

//     if(user.isModified('password')){
//         user.password =  await bcrypt.hash(user.password, 8);
//     }

//     next();
// })

// const User = new mongoose.model('user', userSchema);

// module.exports = User;

