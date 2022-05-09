const projects = require('../models/project');
const upload = require('../imageUpload');
const asyncHandler = require('../middleware/aysnc');
const ErrorResponse = require('../../utils/errorResponse');

// use upload.single to upload images

exports.getAllProjects = async(req, res, next)=>{

    try {
        const result = await projects.find();

        res.status(200).json({success:true,count: result.length, data:result});

    } catch (error) {
        res.staus(404).json({success:false});
    }
    
}

exports.getSingleProject = asyncHandler(async(req, res, next)=>{

    const project = await projects.findOne({name:req.params.name});
    
    if(!project)
    {
       return next(new ErrorResponse(`Bootcamp cannot be found with name of ${req.params.name}`, 404));
    }

    res.status(200).json({sucess: true, data:project});
   
});

exports.createProject = async(req, res, next)=>{

    try {
        const result = await projects.create(req.body);

        res.status(201).json({sucess:true, data:result});
    } catch (error) {
        
        res.status(400).json({sucess:true, data: error});
    }
   
}