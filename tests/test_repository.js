describe('findAll()', () => {
    it('should return all urls', async () => {
        const mockedFindAll = require('./mocks/mockedFindAll.json');

        expect(mockedFindAll.length).toBe(10);
        expect(mockedFindAll[0].short).toBe('abc123');
        expect(mockedFindAll[0].full).toBe('https://www.google.com');
        expect(mockedFindAll[0].count).toBe(10);
        expect(mockedFindAll[0].random).toBe(true);
    });
});

describe('findByShort(short)', () => {
    it('should return unique url', async () => {
        const mockedFindByShort = require('./mocks/mockedFindByShort.json');

        expect(mockedFindByShort.full).toBe('https://www.github.com');
        expect(mockedFindByShort.short).toBe('def456');
        expect(mockedFindByShort.count).toBe(5);
        expect(mockedFindByShort.random).toBe(false);

    });
});

describe('totalCountLastDay()', () => {
    it('should return total url last 24 hours', async () => {
        const mockedMetrics = require('./mocks/metrics.json');

        expect(mockedMetrics.urls_shortened_last_day).toBe(1);
    });
});

describe('totalCountLastWeek()', () => {
    it('should return total url last 1 week', async () => {
        const mockedMetrics = require('./mocks/metrics.json');


        expect(mockedMetrics.urls_shortened_last_week).toBe(10);
    });
});

describe('totalCountLastTwoWeeks()', () => {
    it('should return total url last 2 week', async () => {
        const mockedMetrics = require('./mocks/metrics.json');

        expect(mockedMetrics.urls_shortened_last_two_weeks).toBe(30);
    });
});

describe('totalCountLastMonth()', () => {
    it('should return total url last 1 week', async () => {
        const mockedMetrics = require('./mocks/metrics.json');

        expect(mockedMetrics.urls_shortened_last_month).toBe(50);
    });
});

describe('totalCountLastYear()', () => {
    it('should return total url last 1 week', async () => {
        const mockedMetrics = require('./mocks/metrics.json');

        expect(mockedMetrics.urls_shortened_last_year).toBe(100);
    });
});
