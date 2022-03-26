
const fs = require('fs');
const express = require("express");

const appback = express();

var cors = require('cors'); // CORS -> Cross Origin Resource Sharing

var bodyParser = require('body-parser');


appback.use(bodyParser.json());
appback.use(cors());
appback.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*", "http://localhost:3000/*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    next();

});

const Excel = require('exceljs');

const path = require("path");
const { json } = require('express');

appback.get(`/data`, async (req, res) => {
    var docID = req.query.doc_id;
    var userID = req.query.username;
    var filename = `${docID}.json`;

    const diretoryPath = path.join(__dirname, '/files/', userID, '/', filename);

    console.log(docID, userID);
    console.log(diretoryPath);

    fs.readFile(diretoryPath, (err, data) => {
        if (err) {
            console.log('File not found')
            throw err;
        }
        let ques_data = JSON.parse(data);
        console.log(req.params.doc_id);
        res.send(ques_data);
    });
});


appback.get(`/get_all_filenames_by_user`, async (req, res) => {

    var userID = req.query.username;

    const directory = path.join(__dirname, '/files/', userID);

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    var filenames = fs.readdirSync(directory);
    

    let js = [];
    filenames.forEach((f, index) => {
        js.push({
            filename: f,
            name: JSON.parse(fs.readFileSync(directory + '/' + f)).document_name,
            time: fs.statSync(directory + '/' + f).birthtimeMs
        });

        
    });

    res.json(js);
});




appback.post('/student_response/:doc_id', (req, res) => {
    var docs_data = req.body;
    var name = req.params.doc_id;
    var d = new Date();
    let workbook = new Excel.Workbook();
    var data = req.body.answer_data;
    console.log(data);
    let worksheet = workbook.addWorksheet(`${name}`);

    worksheet.columns = [{ header: "Time Stamp", "key": "datetime" }, ...docs_data.column];
    worksheet.columns.forEach(column => {
        column.width = column.header.length < 12 ? 12 : column.header.length
    })

    worksheet.getRow(1).font = { bold: true };

    data.forEach((e, index) => {
        const rowIndex = index + 2;
        worksheet.addRow({
            d, ...e
        })
    });

    workbook.xlsx.writeFile(`${name}.xlsx`)
});


appback.post(`/add_question`, (req, res) => {


    console.log("ADDING QUESTION");
    var docID = req.query.doc_id;
    var userID = req.query.username;
    const directory = path.join(__dirname, '/files/', userID);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    console.log(directory);
    var docs_data = req.body;
    console.log(docs_data, docID);
    console.log(docs_data, userID);
    let data = JSON.stringify(docs_data);
    fs.writeFileSync(`${directory}/${docID}.json`, data);

    res.send();
});


appback.listen(9000, () => { console.log("Express server is running port number 9000") })

