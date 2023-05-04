const bodyParser = require('body-parser');
const express = require('express')
require('dotenv').config();

const app = express()
app.use(bodyParser.json());

const port = process.env.PORT;
const sequelize = require("./db/connect");
const Sequelize = require("sequelize");

//Define the model
const UrlShortener = require('./models/url_model')(sequelize, Sequelize);

//Define the repositories
const UrlRepository = require('./repositories/url_repository');
const repository = new UrlRepository(UrlShortener);

//Define the controller
const UrlController = require('./controllers/url_controller');
const controller = new UrlController(repository);

app.get('/', (req, res) => {
    controller.GetAllUrls(req, res);
})

app.get('/redirect/:shortUrl', (req, res) => {
    controller.Redirect(req, res);
})

app.get('/metrics/', (req, res) => {
    controller.Metrics(req, res);
})

app.post('/', (req, res) => {
    controller.CreateUrl(req, res);
})

app.listen(port, () => {
    console.log(`App Shortener Url listening on port ${port}`)
})
module.exports = app;