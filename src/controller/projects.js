const projects = require('../models/project');
const upload = require('../imageUpload');

// use upload.single to upload images

exports.getAllProjects = async(req, res, next)=>{
    res.status(200).json({sucess:true, msg:'Hello from get all projects route'});
}

exports.getSingleProject = async(req, res, next)=>{
    res.status(200).json({sucess:true, msg:'Hello from get single project'});
}

exports.createProject = async(req, res, next)=>{

    try {
        const result = await projects.create(req.body);

        res.status(201).json({sucess:true, data:result});
    } catch (error) {
        
        res.status(400).json({sucess:true, data: error});
    }
   
}