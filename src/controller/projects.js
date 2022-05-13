const projects = require('../models/project');
const upload = require('../imageUpload');
const asyncHandler = require('../middleware/aysnc');
const ErrorResponse = require('../../utils/errorResponse');

// use upload.single to upload images

exports.getAllProjects = asyncHandler(async(req, res, next)=>{
    let query;

    const reqQuery = {...req.query};

    //FIELDS TO EXCULDE
    const removeFields = ['select', 'sort'];

    //Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => reqQuery[param])

    let queryString = JSON.stringify(reqQuery);

    // queryString = queryString.replace(/\b(gt||gte|lt|lte|in)\b/g, match => `$${match}`);

    query = projects.find(JSON.parse(queryString));

    //Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');

        query = query.select(fields);
    }

    //Sort
    if(req.query.sort)
    {
        const sortBy = req.query.sort.split(',').join(' ');

        query = query.sort(sortBy);
    }

    const result = await query;

    res.status(200).json({success:true,count: result.length, project:result});
});

exports.getSingleProject = asyncHandler(async(req, res, next)=>{

    const result = await projects.findOne({name:req.params.name});
    
    if(!project)
    {
       return next(new ErrorResponse(`Bootcamp cannot be found with name of ${req.params.name}`, 404));
    }

    res.status(200).json({sucess: true, project:result});
   
});

exports.createProject = asyncHandler(async(req, res, next)=>{

    try {
        const result = await projects.create(req.body);

        res.status(201).json({sucess:true, project:result});
    } catch (error) {
        
        res.status(400).json({sucess:true, project: error});
    }
   
});