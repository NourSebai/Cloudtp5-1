const mongoose = require('mongoose');
const URL_MONGOOSE = process.env.URL_MONGOOSE;

mongoose.connect(URL_MONGOOSE, { useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (err) => console.log(`Error connecting to database ${err}`));
db.once('open', () => console.log('Connected to Database'));

module.exports = mongoose.connection;
