import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const user = { name: 'Jane Doe', shippingEmail: 'jimnam99@gmail.com' };
const product = {
  name: 'Adobe Photoshop 6',
  description: 'Multimedia tool for creating, editing and polishing photos',
  price: '300',
};
const sendMail = async (user, product) => {
  const message = (user, product) => {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'SpurSoftwares',
        link: 'https://spursoft.com',
      },
    });
    const email = {
      body: {
        name: user.name,
        intro:
          "Thank you for shopping on SpurSoft, we're excited to have you on board. Your product is attached to this email. Download, install, activate and knock yourself out. Cheers!!!",
        table: {
          data: [
            {
              item: product.name,
              price: `$ ${product.price}`,
            },
          ],
          columns: {
            // Optionally, customize the column widths
            customWidth: {
              item: '20%',
              price: '15%',
            },
            // Optionally, change column text alignment
            customAlignment: {
              price: 'right',
            },
          },
          action: {
            instructions: 'Leave a review',
            button: {
              color: '#364896',
              text: `Review`,
              link: `http://localhost:3000/${product._id}`,
            },
          },
          outro: 'Need help, or have questions? Just reply to this email.',
        },
      },
    };
    const messageContent = mailGenerator.generate(email);
    return messageContent;
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'spursoft.test@gmail.com',
      pass: 'williamshakespeare22',
    },
  });
  const mailOptions = {
    from: 'spursoft.test@gmail.com',
    to: user.shippingEmail,
    subject: product.name,
    html: message(user, product),
    attachments: [
      {
        path: product.file,
      },
    ],
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info.message);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendMail;
