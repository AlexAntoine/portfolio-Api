const express = require('express');
const mongoose = require('mongoose');

const projectSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },

    main_image:{
        type:Buffer
    },

    about:{
        type: String,
        required: true
    },

    github:{
        type:String,
        require:true,
        unique: true
    },

    website:{
        type: String,
        match:[
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            ,'Please add a valid URL with HTTP or HTTPS'
        ]
    },

    tools:{
        type:[String]
    },

    content:{
        type: Array,

       description: {
           type:String
       }, 
       
       image: {
           type: Buffer
       }
    },
});

const Project = new mongoose.model('project', projectSchema);

module.exports = Project;