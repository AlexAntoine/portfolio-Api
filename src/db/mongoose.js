require('dotenv').config({path: './config/.env'});
const mongoose =  require('mongoose');

const localDB = ()=>{
     return mongoose.connect(process.env.LOCAL, {useNewUrlParser:true, useUnifiedTopology: true, });
}

const prodDB = ()=>{
    return mongoose.connect(process.env.PRODUCTION, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true });
}

module.exports = {
    localDB,
    prodDB
}