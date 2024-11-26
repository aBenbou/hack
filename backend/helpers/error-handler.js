function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        //jwt auth error
        return res.status(401).json({
            message: 'the user is not authorized'
        })
    }
    if (err.name === 'ValidationError') {
        //validation eroor for file upload type
        return res.status(401).json({
            message: err
        })
    }
    //default server error
    return res.status(500).json({
        message: err
    })
}

module.exports = errorHandler;