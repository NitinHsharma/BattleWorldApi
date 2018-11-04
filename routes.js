const battleController = require('./apis/battles/battleController');


module.exports = function(app) {

    /*
     *
     * ping Routes
     * 
     */
    app.get('/ping', (req, res) => {
        return res.send('pong');
    })


    /*
     *
     * battels Routes
     * 
     */
    app.get('/list', battleController.list);

    app.get('/count', battleController.count);

    app.get('/stats', battleController.stats);

    app.get('/search', battleController.search);


}