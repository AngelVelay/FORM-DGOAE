
const fs = require('fs');
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
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
        console.log(req.params.doc_id, ques_data);
        res.send(ques_data);
    });
});


appback.get(`/get_all_filenames_by_user`, async (req, res) => {

    var userID = req.query.username;

    const directory = path.join(__dirname, '/files/', userID);

    if (!fs.existsSync(directory)) {
        res.json([]);
        return;
        //fs.mkdirSync(directory);
    }

    var filenames = fs.readdirSync(directory);

    console.log(filenames);
    let js = [];
    filenames.forEach((f, index) => {

        if (f.endsWith(".json")) {

            js.push({
                filename: f,
                name: JSON.parse(fs.readFileSync(directory + '/' + f)).document_name,
                time: fs.statSync(directory + '/' + f).birthtimeMs
            });
        }


    });

    res.json(js);
});

/***/


appback.get(`/getform`, async (req, res) => {


    var globalID = req.query.global_id;
    console.log("Loading form " + globalID + " ...");
    var filenameAll = `allaccess.json`;
    const diretoryPath = path.join(__dirname, '/files/');

    console.log("Leyendo All Access");
    fs.readFile(diretoryPath + filenameAll, (err, data) => {

        var file = "";
        var user = "";
        var isEnabled = false;
        if (err) {

            console.log('File Allaccess not found')
            throw err;
        }
        let accessfile = JSON.parse(data);
        accessfile.forms.forEach(element => {
            if (globalID === element.gid) {
                user = element.email;
                file = element.file;
                isEnabled = element.enable;
            }

        });

        if (!isEnabled) {
            res.send({ document_name: globalID, document_description: "Cuestionario no habilitado", questions: [] });
            return;
        }
        var filename = `${file}.json`;
        const formPath = path.join(__dirname, '/files/', user, '/', filename);


        fs.readFile(formPath, (err, data) => {
            if (err) {
                console.log('Form not found')
                throw err;
            }
            let ques_data = JSON.parse(data);

            console.log("Loaded form " + globalID);
            res.send(ques_data);
        });

    });

});


appback.get(`/getGlobalID`, async (req, res) => {


    var fid = req.query.id;
    console.log("Geting gid " + fid + " ...");
    var filenameAll = `allaccess.json`;
    const diretoryPath = path.join(__dirname, '/files/');

    console.log("Leyendo All Access");
    fs.readFile(diretoryPath + filenameAll, (err, data) => {

        var globalID = "";
        var user = "";

        if (err) {
            console.log('File Allaccess not found')
            throw err;
        }
        let accessfile = JSON.parse(data);

        accessfile.forms.forEach(element => {
            if (fid === element.file) {
                user = element.email;
                globalID = element.gid;



            }

        });
        console.log({ "gid": globalID })
        res.send({ "gid": globalID });



    });

});

appback.post(`/add_question`, async (req, res) => {


    console.log("ADDING QUESTION");
    var docID = req.query.doc_id;
    var userID = req.query.username;
    const directory = path.join(__dirname, '/files/', userID);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    var filenameAll = `allaccess.json`;
    const accessDiretoryPath = path.join(__dirname, '/files/');

    let find_eleme = false;
    let nelem = 1;

    let dataAccess = fs.readFileSync(accessDiretoryPath + filenameAll);
    let accessfile = JSON.parse(dataAccess);
    console.log("ACCESS INFO: ", accessfile);
    accessfile.forms.forEach(element => {

        if (docID === element.file)
            find_eleme = true;
        nelem++;
    });
    console.log(accessfile, nelem, find_eleme);

    if (!find_eleme) {
        let new_data_elem = {};
        new_data_elem.email = userID;
        new_data_elem.gid = uuidv4();
        new_data_elem.file = docID;
        new_data_elem.enable = false;
        new_data_elem.filename = nelem;
        accessfile.forms.push(new_data_elem);
        let wdata = JSON.stringify(accessfile);
        fs.writeFileSync(accessDiretoryPath + filenameAll, wdata);
    }

    console.log("fin");
    console.log(directory);
    var docs_data = req.body;
    console.log(docs_data, docID);
    console.log(docs_data, userID);
    let data = JSON.stringify(docs_data);
    fs.writeFileSync(`${directory}/${docID}.json`, data);

    res.send();

});

appback.post('/student_response', async (req, res) => {

    var docs_data = req.body;
    var globalID = docs_data.global_id;

    var filenameAll = `allaccess.json`;

    const diretoryPath = path.join(__dirname, '/files/');

    console.log("Dir  " + diretoryPath + filenameAll);
    var exelPath = "";

    var file = "";
    var user = "";
    var id = "";

    fs.readFile(diretoryPath + filenameAll, (err, data) => {


        if (err) {
            console.log('File not found allaccess')
            throw err;
        }
        let accessfile = JSON.parse(data);
        accessfile.forms.forEach(element => {

            console.log(element);
            if (globalID === element.gid) {
                user = element.email;
                file = element.filename;
                id = element.file;
            }

        });

        var filename = `${file}.json`;
        console.log("fileeee", filename);

        console.log("path", exelPath);
        const fdirectory = path.join(path.join(__dirname, '/files/', user, '/responses'));
        if (!fs.existsSync(fdirectory)) {
            fs.mkdirSync(fdirectory);
        }

        fs.readFile(path.join(__dirname, '/files/', user, '/responses/', filename), (err, data) => {

            if (err) {
                console.log(err);
                console.log("Creating File");
                let data = JSON.stringify({ responses: docs_data.answer_data, columns: docs_data.column, doc_name: docs_data.doc_name });
                fs.writeFileSync(path.join(__dirname, '/files/', user, '/responses/', filename), data);
                res.send();
                return;
            }
            let ques_data = JSON.parse(data);
            ques_data.responses.push(docs_data.answer_data[0]);
            let jsondata = JSON.stringify(ques_data);
            fs.writeFileSync(path.join(__dirname, '/files/', user, '/responses/', filename), jsondata);

            res.send();
        });
    });


});

function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

appback.get(`/getExcel`, async (req, res) => {

    var fid = req.query.id;
    console.log("Geting gid " + fid + " ...");
    var filenameAll = `allaccess.json`;
    const diretoryPath = path.join(__dirname, '/files/');

    console.log("Leyendo All Access");
    fs.readFile(diretoryPath + filenameAll, (err, data) => {

        var globalID = "";
        var user = "";
        var filename = "";

        if (err) {
            console.log('File Allaccess not found')
            throw err;
        }
        let accessfile = JSON.parse(data);
        accessfile.forms.forEach(element => {
            if (fid === element.file) {
                user = element.email;
                globalID = element.gid;
                filename = element.filename;
            }

        });

        fs.readFile(path.join(__dirname, '/files/', user, '/responses/', filename + ".json"), (err, data) => {

            if (err) {
                console.log("0 responses", data); res.send(null); return;
            }

            let json_responses = JSON.parse(data);

            res.json(json_responses.responses);

        });


    });
});

appback.post(`/enable_disable`, async (req, res) => {

    var docs_data = req.body;
    var fid = docs_data.fid;
    var isEnabled = docs_data.enabled;

    var filenameAll = `allaccess.json`;
    const diretoryPath = path.join(__dirname, '/files/');

    console.log("Leyendo All Access");


    let accessfile = JSON.parse(fs.readFileSync(diretoryPath + filenameAll));
    console.log(accessfile);
    accessfile.forms.map(element => {
        if (fid === element.file) {
            element.enable = isEnabled;
        }

    });

    console.log(accessfile);

    let jsondata = JSON.stringify(accessfile);
    fs.writeFileSync(diretoryPath + filenameAll, jsondata);
    res.send();
})

appback.get(`/getResponses`, async (req, res) => {


    var fid = req.query.id;
    console.log("Geting gid " + fid + " ...");
    var filenameAll = `allaccess.json`;
    const diretoryPath = path.join(__dirname, '/files/');

    console.log("Leyendo All Access");
    fs.readFile(diretoryPath + filenameAll, (err, data) => {

        var globalID = "";
        var user = "";
        var filename = "";
        var isEnabled = false;
        if (err) {
            console.log('File Allaccess not found')
            throw err;
        }
        let accessfile = JSON.parse(data);
        accessfile.forms.forEach(element => {
            if (fid === element.file) {
                user = element.email;
                globalID = element.gid;
                filename = element.filename;
                isEnabled = element.enable;
            }
        });

        var json_responses = { "rsize": 0, "resp": [], "columns": [] };
        let s_response = {};
        let s_quest = JSON.parse(fs.readFileSync(path.join(__dirname, '/files/', user, '/', fid + ".json")));

        fs.readFile(
            path.join(__dirname, '/files/', user, '/responses/', filename + ".json"),
            (err, data) => {
                if (err) {
                    console.log('File Responeses not found')
                    res.send(json_responses);
                    return;
                }
                s_response = JSON.parse(data)

                if (isEmptyObject(s_response)) {
                    res.send(json_responses);
                    return;
                }

                console.log("RESPUESTAS  ", s_response);

                console.log("PREGUNTAS  ", s_quest);

                json_responses.rsize = s_response.responses.length;
                json_responses.resp = s_response.responses;
                json_responses.columns = s_response.columns;
                json_responses.doc_name = s_response.doc_name;
                json_responses.questions = s_quest;
                json_responses.isEnabled = isEnabled;
                res.send(json_responses);
            });

    });

});



appback.listen(9000, () => { console.log("Express server is running port number 9000") })

