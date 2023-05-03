const utils = require('./../utils/utils');

test('randomUrl generates a string of the correct length', () => {
    const length = 10;
    const result = utils.randomUrl(length);
    expect(result.length).toBe(length);
});

test('isValidUrl returns true for a valid URL', () => {
    const url = 'https://www.google.com';
    const result = utils.isValidUrl(url);
    expect(result).toBe(true);
});

test('isValidUrl returns false for an invalid URL', () => {
    const url = 'not a valid url';
    const result = utils.isValidUrl(url);
    expect(result).toBe(false);
});

test('isUrlAvailable returns true for an available URL', async () => {
    const url = 'https://www.google.com';
    const result = await utils.isUrlAvailable(url);
    expect(result).toBe(true);
});

test('isUrlAvailable returns false for an unavailable URL', async () => {
    const url = 'https://www.thisurlprobablydoesnotexist.com';
    const result = await utils.isUrlAvailable(url);
    expect(result).toBe(false);
});