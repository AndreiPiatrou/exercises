const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/ping', (req, res) => res.status(200).json({ message: 'ok' }));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(3000);

module.exports = app;
