const utils = require('../utils/utils');
const Ajv = require("ajv")
const ajv = new Ajv()
const baseURL = process.env.BASE_URL;
class UrlController {
    constructor(repository) {
        this.repository = repository;
        this.schema = {
            type: "object",
            properties: {
                full: { type: "string" },
                short: { type: "string" }
            },
            required: ["full"],
            additionalProperties: false
        }
        this.validate = ajv.compile(this.schema)
    }
    async GetAllUrls(req, res) {
        try {
            const urls = await this.repository.findAll();
            res.status(200).json(urls);
        } catch (err) {
            console.error(err);
            res.status(500).send({ err: 'Internal server error' });
        }
    }

    async CreateUrl(req, res) {
        const fullUrl = req.body.full;
        const valid = this.validate(req.body)
        if (!valid) {
            res.status(400).send({ err: 'Invalid body' });
            return;
        }
        if (!utils.isValidUrl(fullUrl)) {
            res.status(400).send({ err: 'full url invalid' });
            return;
        }
        let random = true;
        let shortUrl = ""
        const body = req.body;
        if (body.short) {
            shortUrl = body.short;
            random = false;
        }
        else {
            shortUrl = utils.randomUrl(6);
        }
        try {
            const urlShortner = await this.repository.create({ full: fullUrl, short: shortUrl, random: random });

            const url = baseURL + "/redirect/" + urlShortner.dataValues.short;
            res.status(201).json({ url: url });
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(409).send({ err: 'Short in use' });
            }
            else {
                res.status(500).send('Internal server error');
            }
        }
    }

    async Redirect(req, res) {
        const shortUrl = req.params.shortUrl;
        try {
            const url = await this.repository.findByShort(shortUrl);
            if (!url) {
                res.status(404).send({ err: 'Short URL not found' });
            } else {
                url.count += 1;
                await url.save();
                const available = await utils.isUrlAvailable(url.full);
                if (!available) {
                    res.status(503).send({ err: 'Full URL Unavailable' });
                    return;
                }
                res.redirect(url.full);

            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }
    }

    async Metrics(req, res) {
        try {
            const total = await this.repository.findAll();
            const lastDay = await this.repository.totalCountLastDay();
            const lastWeek = await this.repository.totalCountLastWeek();
            const lastTwoWeeks = await this.repository.totalCountLastTwoWeeks();
            const lastMonth = await this.repository.totalCountLastMonth();
            const lastYear = await this.repository.totalCountLastYear();
            const countByShortUrl = await this.repository.totalRedirectCountUrls();
            let listCountByShortUrl = [];
            for (let i = 0; i < countByShortUrl.length; i++) {
                let obj = {};
                obj[countByShortUrl[i].short] = countByShortUrl[i].count;
                listCountByShortUrl.push(obj);
            }

            const metrics = {
                total_urls_shortened: total.length,
                urls_shortened_last_day: lastDay.length,
                urls_shortened_last_week: lastWeek.length,
                urls_shortened_last_two_weeks: lastTwoWeeks.length,
                urls_shortened_last_month: lastMonth.length,
                urls_shortened_last_year: lastYear.length,
                redirect_count_by_short_url: listCountByShortUrl
            }
            res.status(200).json(metrics);
        } catch (err) {
            console.error(err);
            res.status(500).send({ err: 'Internal server error' });
        }
    }
}

module.exports = UrlController;