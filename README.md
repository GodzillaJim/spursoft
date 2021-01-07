# SpurSoft
## Introduction
This project is being undertaken in fulfilment of the requirements of INF 470E, Software Engineering course. SPURSOFT is an online software shop where internet users can purchase system
and application software, pay and receive said software in an email address
of their choosing. 

At the moment, the application is a user management back-end supporting the 
following features.
1. User registration
2. User login
3. Viewing products
4. Searching products
5. Adding, removing product from cart
6. Place order
7. Pay using PayPal
8. View, change profile
9. View orders
10. Email product upon payment

To support the above functions, the application exposes the following APIs:
1. product routes in the file backend/routes/productRoutes
2. order routes in the file backend/routes/orderRoutes
3. user routes in the file backend/routes/userROutes
They are all easy to understand, guaranteed.


## Installation
### Requirements
* Node at least v15.3.0 <br>
* npm at least 6.14.9 or <br> Yarn 1.22.5
* Mongodb server, latest version. <br>

This project is not tested on other versions. We are assured that these minimum requirements will provide an optimum experience. <br>

### Installation
Clone this project. <br>
```
git clone https://github.com/GodzillaJim/spursoft
```
Change into the cloned folder.

```
cd spursoft
```
Run yarn install or npm install to install dependencies.
```
yarn install
```
or 
```
npm install
```
#### Environment variables
create .env and fillout the following fields
1. NODE_ENV = 'development'
2. PORT = 5000
3. MONGO_URI = 
4. JWT_SECRET = 
5. PAYPAL_CLIENT_ID = 
6. MAIL_USERNAME = 
7. MAIL_PASSWORD = 
8. MAIL_SERVICE = 
9. MAIL_HOST = 

Create a folder called files in the root
```
mkdir files
```
Also create another folder called uploads
```
```
mkdir uploads
```

cd frontend
```
Create folder images in public

```
mkdir public/images
```
Run yarn install or npm install to install dependencies.
```
yarn install
```
or 
```
npm install
```
Run this command to populate initial sample data
```
yarn data:import
```
Run, if necessary, this command to destroy said data

```
yarn data:destroy
```
Then run the dev script to start the application in development mode.
```
yarn dev
```
or 
```
npm dev
```

Knock yourself out.