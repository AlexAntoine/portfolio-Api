require('dotenv').config({path: './config/.env'});
const express = require('express');
const {localDB, prodDB} = require('./db/mongoose');
const errorHandler = require('./middleware/error');
const userProjects = require('./router/projectsRoutes');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use('/api/v1/projects', userProjects);

app.use(errorHandler);

localDB();
// prodDB();

const server = app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})

process.on('unhandledRejection',(err, promise)=>{
    console.log(`Error: ${err.message}`);

    server.close(()=>{
        process.exit(1);
    });
})