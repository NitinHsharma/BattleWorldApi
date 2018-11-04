var userService = require('./userService');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('./../../config/config.json');

const register = async(req, res) => {
    try {

        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };

        const data = await userService.insertUser(user);
        var token = jwt.sign({ id: user._id }, config.app.secret, {
            expiresIn: config.app.timeout // expires in 24 hours
        });
        return res.send(token);

    } catch (err) {
        res.statusCode = 500;
        return res.send('failed to register');
    }
}

const login = async(req, res) => {

    try {

    } catch (err) {

    }
}




module.exports = {
    register
};