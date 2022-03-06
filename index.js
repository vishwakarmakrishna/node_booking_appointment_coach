
const express = require('express');
const csv = require('csv-parser')
const fs = require('fs')
var moment = require('moment-timezone');
const app = express();
const PORT = process.env.PORT || 7720;


const results = [];
const booked = [];

fs.createReadStream('dataset.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        // console.log(results);
    });

app.get('/', (req, res) => {
    res.send('Welcome to the API server');
});

//I want to see all coaches in the database
app.get('/api/coaches', (req, res) => {
    res.send(results);
});
//I want to see all booked in the database
app.get('/api/coach/booked', (req, res) => {
    res.send(booked);
});

//I want to see which coaches I can schedule with name
app.get('/api/coaches/:name', (req, res) => {

    var tempData = [];
    results.forEach(function (item) {
        if (item.Name == req.params.name) {
            tempData.push(item);
        }
    });
    res.send(tempData);
});
var date = new Date();
var data = (date.toUTCString());
//I want to see which coaches I can schedule with timezone
app.get('/api/coaches/:name/recent', (req, res) => {

    var tempData = [];
    results.forEach(function (item) {
        if (item.Name == req.params.name) {
            tempData.push(item);
        }
    });
    var tempData2 = [];
    tempData.forEach(function (item) {
        var tZ = item.Timezone;
        var tZ2 = tZ.split(' ');
        var newdata = moment().tz(`${tZ2[1]}`).format('Z');
        if (tZ2[1] == "America/North_Dakota/New_Salem") {
            tempData2.push(newdata);
        }
        // console.log(new Date("Fri Jan 20 2012 11:51:36 GMT-0500").toUTCString())

    });
    res.send(tempData2);
});

app.get('/api/coaches/:name/day/:days', (req, res) => {

    var tempData = [];
    results.forEach(function (item) {
        if (item.Name == req.params.name) {
            tempData.push(item);
        }
    });
    var tempData2 = [];
    tempData.forEach(function (item) {

        if (item['Day of Week'] == req.params.days && req.params.days == rawdays(date.getDay())) {
            tempData2.push(item);
        }


    });
    res.send(tempData2);
});
app.get('/api/coaches/:name/day/:days/book/:index', (req, res) => {
    const i = req.params.index;
    var tempData = [];
    results.forEach(function (item) {
        if (item.Name == req.params.name) {
            tempData.push(item);
        }
    });
    var tempData2 = [];

    for (let index = 0; index < tempData.length; index++) {
        const item = tempData[index];

        if (item['Day of Week'] == req.params.days && req.params.days == rawdays(date.getDay())) {
            tempData2.push(item);
        }

    }
    console.log(booked);

    console.log(tempData2[i]);

    booked.push(tempData2[i]);
    console.log(booked);


    res.send(`Booked an appointment with ${tempData2[i]['Name']} on ${tempData2[i]['Day of Week']} from ${tempData2[i]['Available at']} to ${tempData2[i]['Available until']}`);

});



function rawdays(rawdays) {
    switch (rawdays) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";
        default:
            return;
    }

}

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));

