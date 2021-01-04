import express from 'express'
import { getProducts, getProductsById, deleteProduct } from '../controllers/productControllers.js'
import {} from '../middleware/authMiddleware.js'
const router = express.Router()

// @desc Fetch all products 
// @route GET /api/products
// @access public
router.route('/').get(getProducts)

// @desc Fetch one products 
// @route GET /api/products:id
// @access public
router.route('/:id').get(getProductsById).delete(protect, admin, deleteProduct )

export default router