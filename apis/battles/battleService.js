const battleModel = require('../../libs/mongo').battleModel;

class battelService {

    // find location 
    async list() {
        const data = await battleModel.find({}, { 'location': 1, '_id': 0 });
        const locationData = data.map((item) => item.location);
        const uniqueData = [...new Set(locationData)];
        return uniqueData;
    }

    // count 
    async count() {
        return await battleModel.countDocuments();
    }

    // stats
    async stats() {
        const data = await battleModel.find({});
        let most_active = {};
        let attacker_outcome = {};
        let battle_type = [];
        let defender_size = {};

        let dzmin = undefined;
        let dzmax = 0;
        let dzsum = 0;
        let dzCount = 0;

        let attackeWin = 0;
        let attackeLoss = 0;

        let attacker_king = {};
        let defender_king = {};
        let region = {};
        let name = {};

        for (const iterator of data) {
            // unique battle
            if (iterator.battle_type && !battle_type.includes(iterator.battle_type)) {
                battle_type.push(iterator.battle_type);
            }

            // min defender_size
            if (dzmin === undefined || (iterator.defender_size && dzmin > iterator.defender_size)) {
                dzmin = iterator.defender_size;
            }

            // max defender_size
            if (dzmax < iterator.defender_size) {
                dzmax = iterator.defender_size;
            }

            // avg defender_size
            dzsum += iterator.defender_size;
            dzCount++;

            // win loss
            if (iterator.attacker_outcome === 'win') {
                attackeWin++;
            } else {
                attackeLoss++;
            }

            // most active
            if (attacker_king[iterator.attacker_king]) {
                attacker_king[iterator.attacker_king]++;
            } else {
                attacker_king[iterator.attacker_king] = 1;
            }

            if (defender_king[iterator.defender_king]) {
                defender_king[iterator.defender_king]++;
            } else {
                defender_king[iterator.defender_king] = 1;
            }

            if (region[iterator.region]) {
                region[iterator.region]++;
            } else {
                region[iterator.region] = 1;
            }

            if (name[iterator.name]) {
                name[iterator.name]++;
            } else {
                name[iterator.name] = 1;
            }

        }

        defender_size.min = dzmin;
        defender_size.max = dzmax;
        defender_size.avg = Math.floor(dzsum / dzCount);

        attacker_outcome.win = attackeWin;
        attacker_outcome.loss = attackeLoss;

        let attacker_kingName = undefined;
        let attackerValue = 0;
        for (const [key, value] of Object.entries(attacker_king)) {
            if (attackerValue < value) {
                attackerValue = value;
                attacker_kingName = key;
            }
        }

        let defender_kingName = undefined;
        let defenderValue = 0;
        for (const [key, value] of Object.entries(defender_king)) {
            if (defenderValue < value) {
                defenderValue = value;
                defender_kingName = key;
            }
        }

        let regionMax = undefined;
        let regionCount = 0;
        for (const [key, value] of Object.entries(region)) {
            if (regionCount < value) {
                regionCount = value;
                regionMax = key;
            }
        }

        let nameMax = undefined;
        let nameValue = 0;
        for (const [key, value] of Object.entries(name)) {
            if (nameValue < value) {
                nameValue = value;
                nameMax = key;
            }
        }

        most_active.attacker_king = attacker_kingName;
        most_active.defender_king = defender_kingName;
        most_active.region = regionMax;
        most_active.name = nameMax;

        return { most_active, attacker_outcome, battle_type, defender_size };
    }

    // search
    async search(params) {
        const { king, query } = params;
        const findQuery = {
            $and: [{
                $or: [{ 'attacker_king': king, 'defender_king': king },
                    query
                ]
            }]
        };
        return await battleModel.find(findQuery);
    }



}

module.exports = new battelService();