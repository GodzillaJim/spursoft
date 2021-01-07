import sendMail from '../mail/Mailer.js';
// import Product from '../models/productModel.js';
// import User from '../models/userModel.js'
// import mongoose from 'mongoose'
import Order from '../models/orderModel.js'

// test purpose
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect('mongodb://localhost:27017/spursoft', {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };
// connectDB();
// end of test code
const sendOrder = async (order) => {
  const orderT = await Order.findById(order._id).populate('user orderItems.product')
  const { orderItems, user: userInfo} = orderT

  // user: { name, shippingEmail}
  // product: { item, price, file }
  orderItems.map((item) => {
    const user = {
      name: userInfo.name,
      shippingEmail: orderT.shippingAddress,
    };
    // const itemProduct = Product.findById(item.produc);
   // if (!itemProduct) {
     // console.log('Product not found');
    //}
    const product = {
      name: item.name,
      price: item.price,
      file: `./${item.product.file}`,
    };
    console.log("user: " + JSON.stringify(user) + ',\n product: ' + JSON.stringify(product))
      console.log(sendMail(user, product));
  });
    // onsole.log(sendMail(user, product));
  return
};
export default sendOrder
