import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('password'),
        isAdmin: true
    },{
        name: 'John Doe', 
        email: 'jon@example.com',
        password: bcrypt.hashSync('password'),
    },{
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('password'),
    }
]
export default users