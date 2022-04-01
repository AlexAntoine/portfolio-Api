require('dotenv').config({path: './config/.env'});
const mongoose =  require('mongoose');

const localDB = ()=>{
     mongoose.connect(process.env.LOCAL, {useNewUrlParser:true, useUnifiedTopology: true, });
     console.log('local db is connected');
}

const prodDB = ()=>{
    return mongoose.connect('', {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true });
}

module.exports = {
    localDB,
    prodDB
}