const {Op} = require("sequelize");
const moment = require('moment');


class UrlRepository {
    constructor(model) {
        this.model = model;
        model.sync().then(r => console.log(r));
    }

    async create(data) {
        return this.model.create(data);
    }

    async findAll() {
        return this.model.findAll();
    }

    async findByShort(short) {
        return this.model.findOne({where: {short: short}});
    }

    async totalRedirectCountUrls(limit) {
        return this.model.findAll({order: [['count', 'DESC']], limit: limit});
    }

    async totalCountLastDay() {
        return this.model.findAll({where: {createdAt: {[Op.between]: [moment().subtract(1, 'days'), moment()]}}});
    }

    async totalCountLastWeek() {
        return this.model.findAll({where: {createdAt: {[Op.between]: [moment().subtract(7, 'days'), moment()]}}});
    }

    async totalCountLastTwoWeeks() {
        return this.model.findAll({where: {createdAt: {[Op.between]: [moment().subtract(14, 'days'), moment()]}}});
    }

    async totalCountLastMonth() {
        return this.model.findAll({where: {createdAt: {[Op.between]: [moment().subtract(30, 'days'), moment()]}}});
    }

    async totalCountLastYear() {
        return this.model.findAll({where: {createdAt: {[Op.between]: [moment().subtract(365, 'days'), moment()]}}});
    }
}

module.exports = UrlRepository;