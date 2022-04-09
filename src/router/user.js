require('dotenv').config({path: './config/.env'});
const express = require('express');
const User = require('../models/user');
const Project = require('../models/project')
const mongoose = require('mongoose');
const router = new express.Router();
const multer = require('multer');

const upload = multer({
    /* Adjust for file size and file type */
});
/***** GET ROUTES *****/

router.get('/',(req, res)=>{

    res.send('Hello from Portfolio Api')
});

router.get('/projects', async(req, res)=>{

    const projects = await Project.findOne();
    console.log(projects);
        
})

router.get('/:name', async(req, res)=>{

    const {name} = req.params;
    const project = await Project.findOne({name});

    if(!project)
    {
        res.status(404).send('Project doesn\'t exist. Check the URL');
    }
    else{
        res.status(200).send(project)
    }
})

/***** POST ROUTES *****/

router.post('/',async(req, res)=>{

    const projectName = req.body.name;
    try{

        const project = new Project({
            name:projectName
        });

        const result = await project.save();
    
        res.status(201).send('Project Saved!');

    }catch(e){
        console.log(e)
        res.status(500).send('Something went wrong!');
    }

   
});

router.post('/:name/main-image', upload.single('image'),async(req, res)=>{
    const project = await Project.findOne({name: req.params.name})

    console.log(project)
    if(!project){
       return res.status(404).send('project doesn\'t exist. Check URL');
    }
    else{

        project.main_image = req.file.buffer;
        await project.save();

        res.status(200).send('Main image Saved');
    }

});

router.post('/:name/description',async(req, res)=>{

    const project = await Project.findOne({name: req.params.name})

    if(!project){
       return res.status(404).send('project doesn\'t exist. Check URL');
    }
    else{
        
        const {about, link} = req.body.description;

        project.description.about = about;
        project.description.github_link = link;

        await project.save();
        res.status(200).send('Description Saved');  
    }
});

router.post('/:name/technolgies', async(req, res)=>{
    const project = await Project.findOne({name: req.params.name});
    
    try{
        project.technologies.website_link = req.body.link;

        req.body.tools.forEach( async(tool)=>{
            project.technologies.tools.push({tool});
    
            const result = await project.save();
    
            // console.log(result)
    
        });

        res.status(200).send('Technologies Saved!')
    }catch(e)
    {
        console.log(e);
        res.status(500).send("Something went wrong server side");
    }
});

router.post('/:name/content',upload.single('image'),async(req, res)=>{
    const project = await Project.findOne({name: req.params.name});

    if(!project)
    {
        return res.status(404).send('project doesn\'t exist. Check URL');
    }
    else{
        const image = req.file.buffer;
        const title = req.body.title;

        // console.log(project)
   
       project.content.stuff.push({content_text:title, content_image:image});

        const result = await project.save();
        // console.log(result)

        res.status(200).send('Content Saved!');
    }
});

module.exports = router;