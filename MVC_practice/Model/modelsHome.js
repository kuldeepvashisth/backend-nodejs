const fs = require('fs').promises;
const path = require('path');
const rootdir = require('../utils/path');

const homeDatapath = path.join(rootdir, 'data', 'homes.json');

module.exports = class Home {
    constructor(houseName, price, location, pernight, image) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.pernight = pernight;
        this.image = image;
    }
    async save() {
        const registeredhouse = await Home.fetchAll();
        registeredhouse.push(this);
// mkdir is used to ,if folder not exist then first create then write/read
        await fs.mkdir(path.dirname(homeDatapath), { recursive: true });
        await fs.writeFile(homeDatapath, JSON.stringify(registeredhouse, null, 2));
    }

    static async fetchAll() {
        try {
            const data = await fs.readFile(homeDatapath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }
};


