const pg = require('pg');
const Pool = pg.Pool;

// Pool is created with these settings,
// Noting that it is connected to the 'koalaholla' database
const pool = new Pool({
    database: 'koalaholla',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

// If it actually connects, leave us a message!
pool.on('connect', () => {
    console.log('Pool connected!');
});

// If it does not connect, log an error
pool.on('error', (err) => {
    console.log('DB Error: ', err);
});

module.exports = pool;