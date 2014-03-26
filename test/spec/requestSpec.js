var request = require('request');


var ms = require('../../');
ms.config({
    dir: require('path').resolve(__dirname, '../response')
});
ms.listen(8848);

// close server N seconds
ms.close(3500);

var testResponse = function (option, done) {

    option.params = JSON.stringify(option.params || {});

    var url = 'http://localhost:8848/request.ajax?path=' 
        + option.path + '&params=' + option.params;

    request(url, function(error, response, body){
        var data = JSON.parse(body).data;

        if (option.validate) {
            option.validate(data);  
        } else {
            var exValue = option.key ? data[option.key] : data;
            expect(exValue).toEqual(option.value);
        }
        
        done && done();
    });
};

describe('jasmine-node', function () {
    it('should response with hello mockies!', function (done) {
        testResponse({
            path: 'GET/halo',
            params: {name: 'mockies'},
            value: 'hello mockies!'
        }, done);
    });

    it('test get_material. data.length == 3', function (done) {
        testResponse({
            path: 'GET/material',
            params: {},
            key: 'length',
            value: 3
        }, done);
    });

    it('should respond with data.finished == true', function (done) {
        testResponse({
                path: 'GET/modules',
                params: {},
                key: 'finished',
                value: true
            }, done);
    }, 4000);
});

