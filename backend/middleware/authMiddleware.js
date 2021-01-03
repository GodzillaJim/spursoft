import jwt from 'jsonwebtoken'
import _ from 'lodash'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {   
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error.message)
            res.status(400)
            throw new Error('Please login again')
        }
    } else {
        res.status(401)
        throw new Error('Token not found')
    }
})
const admin = ( req, res, next ) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.statsu(401)
        throw new Error('Not authorized as an admin')
    }
}
export {
    protect, admin
}
