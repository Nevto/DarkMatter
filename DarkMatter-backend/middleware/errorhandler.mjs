import fs from 'fs'
import path from 'path'
import ErrorResponse from '../models/ErrorResponseModel.mjs'

export const errorHandler = (err, req, res, next) => {

    let error = new ErrorResponse(err.message, err.statusCode || 500)

    const filePath = path.join(__appdir, 'logs', 'error.log')
    // err.statusCode = err.statusCode || 500
    // err.status = err.status || 'Try again, you may have made a mistake.'

    const message = `req: ${req.method} ${req.originalUrl} ${new Date().toLocaleTimeString()} ${error.message}\n`

    fs.appendFile(filePath, message, err => {
        if (err) {
            console.log('Error writing to log file.')
        }
    })

    res.status(error.statusCode).json({ success: false, error: error.message })

    next()
}

export default errorHandler