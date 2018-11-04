const battleService = require('./battleService');


const list = async(req, res) => {
    try {

        const data = await battleService.list();
        return res.send(data);

    } catch (err) {
        res.statusCode = 500;
        return res.send();
    }
}

const count = async(req, res) => {
    try {

        const count = await battleService.count();
        return res.send(count.toString());

    } catch (err) {
        res.statusCode = 500;
        return res.send();
    }
}


const stats = async(req, res) => {
    try {

        // booking logic
        const data = await battleService.stats();
        return res.send(data);

    } catch (err) {
        res.statusCode = 500;
        return res.send();
    }
}


const search = async(req, res) => {
    try {

        const requestQuery = req.query;
        const kingName = requestQuery.king;
        delete requestQuery.king;
        const data = await battleService.search({ king: kingName, query: requestQuery });
        return res.send(data);

    } catch (err) {
        res.statusCode = 500;
        return res.send();
    }
}




module.exports = {
    list,
    count,
    stats,
    search
}