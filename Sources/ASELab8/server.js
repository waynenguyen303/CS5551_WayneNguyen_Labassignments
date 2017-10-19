var express = require('express');
var app = express();
var request = require('request');
var http = require('http'), https = require('https');



var result ={'gresult':[]};
var result1 ={'yresult':[]};
var ven2;
app.get('/data', function (req,res)
{
    request('https://kgsearch.googleapis.com/v1/entities:search?query=ball&key=AIzaSyAIJC4iA7279Vyq2gLVfzzDmZUooqShUhI&limit=10',
        function (error, response, body) {
            if (error) {
                return console.log('Google Api Error', error);
            }
            if (response.statusCode !== 200) {
                return console.log('Invalid code returned', response.statusCode)
            }
            body = JSON.parse(body);

            var ven = body.itemListElement;
            //console.log(ven);

            var options = {
                host: 'translate.yandex.net',
                port: 443,
                path: '/api/v1.5/tr.json/translate?key=trnsl.1.1.20170913T034651Z.489eb6aa12589e99.525b452bb54efb9faac7e0307e28d7d024576cf1&lang=fr&text=ball',
                method: 'GET'
            };

            https.request(options, function (res) {

                res.setEncoding('utf8');

                res.on('data', function (chunk) {
                    var res = JSON.parse(chunk);
                    if (res.code == 200) {
                        ven2 = res.text;

                        console.log(res.text + '');
                    } else {
                        console.log('ERR ' + chunk);
                    }

                });

            }).end();

            console.log(ven2);
            for (var i = 0; i < ven.length; i++) {
                result.gresult.push({'name': ven[i].result.name, 'description': ven[i].result.description,'translated':ven2});
            }
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();

        });

});

/*app.get('/data2', function (req,res) {

        var options = {
            host: 'translate.yandex.net',
            port: 443,
            path: '/api/v1.5/tr.json/translate?key=trnsl.1.1.20170913T034651Z.489eb6aa12589e99.525b452bb54efb9faac7e0307e28d7d024576cf1&lang=fr&text=flower',
            method: 'GET'
        };

        https.request(options, function (res) {

            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                var res = JSON.parse(chunk);
                if (res.code == 200) {
                    result1.yresult.push(res.text);
                    console.log(res.text + '');
                } else {
                    console.log('ERR ' + chunk);
                }

            });
        }).end();
});*/


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("http://127.0.0.1:8081/data");
    console.log("http://127.0.0.1:8081/data2");
});