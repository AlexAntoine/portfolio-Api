require('dotenv').config({path: './config/.env'});
const fs = require('fs');
const colors = require('colors');
const mongoose = require('mongoose');
const project = require('./src/models/project');

mongoose.connect(process.env.LOCAL, {useNewUrlParser:true, useUnifiedTopology: true, });

//READ JSON Files
const projects = JSON.parse(fs.readFileSync(`${__dirname}/_data/projects.json`,'utf-8'));

//Import to DB

const importData = async()=>{
    try {
        await project.create(projects);

        console.log('Data Imported....'.green.inverse);

        process.exit(1);

    } catch (error) {
        console.log(error)
    }
}

//Delete Data
const deleteData = async()=>{

    try {
        await project.deleteMany();

        console.log('Data Deleted...'.red.inverse);

        process.exit(1);

    } catch (error) {
        console.log(error);
    }
}

if(process.argv[2]=== '-i'){
    importData();

}else if(process.argv[2]=== '-d'){
    deleteData();
}