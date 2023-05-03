const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("postgres", "postgres","postgres", {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;