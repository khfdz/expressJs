const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const router = require('./router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route untuk halaman tabel
app.get('/indexTabel.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'indexTabel.html'));
});

// Gunakan router untuk route /save
app.use('/save', router);

// Route GET untuk mengambil data dari JSON
app.get('/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        const jsonData = JSON.parse(data);
        res.send(jsonData);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
