import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const addPath = asyncHandler(async (req, res, next) => {
  const { orderItems } = req.body;
  orderItems.map((item) => {
    Product.findById(item.product, (err, data) => {
        if(data) {
            const file = data.file
            return { ...item, file}
        }
        return item
    });
  });
});
export default addPath