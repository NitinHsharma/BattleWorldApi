const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Config = require('../config/config.json');

// ConnectionString
let dbHost = Config.db_config.host;
//dbHost = dbHost.replace('{{username}}', process.env.DBUSER).replace("password", process.env.DBPASSWORD);

mongoose.Promise = global.Promise;

// Connection function
var connectWithRetry = function() {
    mongoose.connect(dbHost, { server: { auto_reconnect: true, reconnectTries: 2, useNewUrlParser: true, useNewUrlParser: true } }, function(err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};

// calling connection
connectWithRetry();

// connection success event
mongoose.connection.on('connected', function() {
    console.log("Connected");
})

// connection error event
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

// connection disconnected event
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');

});


// battel Schema
const battle = new Schema({
    name: {
        type: 'String'
    },
    year: {
        type: 'Number'
    },
    battle_number: {
        type: 'Number'
    },
    attacker_king: {
        type: 'String'
    },
    defender_king: {
        type: 'String'
    },
    attacker_1: {
        type: 'String'
    },
    attacker_2: {
        type: 'String'
    },
    attacker_3: {
        type: 'String'
    },
    attacker_4: {
        type: 'String'
    },
    defender_1: {
        type: 'String'
    },
    defender_2: {
        type: 'String'
    },
    defender_3: {
        type: 'String'
    },
    defender_4: {
        type: 'String'
    },
    attacker_outcome: {
        type: 'String'
    },
    battle_type: {
        type: 'String'
    },
    major_death: {
        type: 'Number'
    },
    major_capture: {
        type: 'Number'
    },
    attacker_size: {
        type: 'String'
    },
    defender_size: {
        type: 'Number'
    },
    attacker_commander: {
        type: 'String'
    },
    defender_commander: {
        type: 'String'
    },
    summer: {
        type: 'Number'
    },
    location: {
        type: 'String'
    },
    region: {
        type: 'String'
    },
    note: {
        type: 'String'
    }
});


var user = new Schema({
    name: String,
    email: String,
    password: String
});


// export schema
module.exports = {
    battleModel: mongoose.model('battleSchema', battle, 'battles'),
    userModel: mongoose.model('UserSchema', user, 'users')

};