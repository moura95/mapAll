module.exports = (sequelize, DataTypes) => {
    const UrlShortener = sequelize.define('url_shortener', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        full: {
            type: DataTypes.STRING,
            allowNull: false
        },
        short: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        random: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'url_shortener',
    });
    return UrlShortener;
};

