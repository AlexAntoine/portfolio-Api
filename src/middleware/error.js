const ErrorResponse = require('../../utils/errorResponse');

const errorHandler = (error, req, res, next)=>{

    let err = {...error};

    err.message = error.message;    

    //CastError
    if(error.name === "CastError"){
       
        const message = `Resource not found with the name of ${error.value}`;

        err = new ErrorResponse(message, 404);
    }
    
    res.status(err.statusCode || 500).json({success:false, err: err.message || 'Server Error'})
}

module.exports = errorHandler;