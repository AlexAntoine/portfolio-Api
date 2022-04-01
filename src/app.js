const express = require('express');
const {localDB, prodDB} = require('./db/mongoose');
const userRouter = require('./router/user');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(userRouter);


localDB();
// prodDB();

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})