const axios = require('axios');

function randomUrl(size) {
    const runes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
    let b = '';
    for (let i = 0; i < size; i++) {
        b += runes[Math.floor(Math.random() * runes.length)];
    }
    return b;
}

function isValidUrl(url) {
    const regex = new RegExp('^https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}$');
    return regex.test(url);
}


async function isUrlAvailable(url) {
    try {
        await axios.head(url);
        return true;
    } catch (error) {
        return false;
    }
}
module.exports = {randomUrl, isValidUrl, isUrlAvailable};