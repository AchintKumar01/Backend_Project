const asyncHandler = (requestHandler) =>{
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err => next(err)))
    }
}

export {asyncHandler}





// wrapper function to use at multiple places
// const asyncHandler = (fn) => async (req, res, next) => { // passing fn as a parameter to another function
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// } 