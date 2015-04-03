require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:

var http = require('http');
var url = "http://127.0.0.1:8000/target.xls";
var XLS = require('xlsjs');


AV.Cloud.define("parse_xls", function (request, response) {
    http.get(request.params.url, function (res) {
        res.setEncoding('binary'); // this
        var data = "";
        res.on('data', function (chunk) {
            return data += chunk;
        });
        res.on('end', function () {
            var obj = XLS.read(data, {type: "binary"});
            var students = XLS.utils.sheet_to_json(obj.Sheets[obj.SheetNames[0]]);
            response.success(students);
            return students;
        });
        res.on('error', function (err) {
            console.log("Error during HTTP request");
            console.log(err.message);
            response.error(err);
        });
    });
});

