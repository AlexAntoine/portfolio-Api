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

    description:[{ 
        about:{
            type: String
        },

        github_link:{
            type: String
        }
    }],

    description:{
        about:{
            type:String
        },

        github_link:{
            type:String
        }
    },

    technologies:{
        website_link:{
            type: String
        },

        tools:[{
           tool:{
               type: String
           }
        }]
    },

    content:{
        stuff:[{
            content_text:{
                type: String,
                required: true 
            },

            content_image:{
                type: Buffer,
                required: true 
            }
        }]
    },
});

const Project = new mongoose.model('project', projectSchema);

module.exports = Project;