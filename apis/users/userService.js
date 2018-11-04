const userModel = require('./../../libs/mongo').userModel;

class UserService {

    // find location 
    async insertUser(user) {
        const newUser = userModel(user);
        return await newUser.save();

    }


}

module.exports = new UserService();