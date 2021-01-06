import express from 'express';
import {
  getProducts,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productControllers.js';
import {protect, admin} from '../middleware/authMiddleware.js';
const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access public
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)

// @desc Fetch one products
// @route GET /api/products:id
// @access public
router
  .route('/:id')
  .get(getProductsById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route('/:id/reviews').post(protect, createProductReview)
export default router;
