const express = require('express');
const router = new express.Router();
const {getAllProjects, getSingleProject, createProject}= require('../controller/projects');


/***** GET ROUTES *****/

router.route('/',).get(getAllProjects).post(createProject);

router.route('/:name').get(getSingleProject)

module.exports = router;