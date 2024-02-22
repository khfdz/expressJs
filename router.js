const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    const newData = { name, email, password };

    fs.readFile(path.join(__dirname, 'public', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        let jsonData = [];
        if (data) {
            jsonData = JSON.parse(data);
        }

        jsonData.push(newData);

        fs.writeFile(path.join(__dirname, 'public', 'data.json'), JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            res.redirect('/');
        });
    });
});

module.exports = router;
