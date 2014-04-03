/**
 * 错误日志处理
 * 
 * @param  {[type]} exception [description]
 * @param  {[type]} msg       [description]
 * @return {[type]}           [description]
 */
global.printError = function (exception, msg) {
    // 如果全局没有指定错误处理方法；默认不输出
    if (!process._logError) {
        return;
    }

    // 描述信息直接打印
    if (msg) {
        console.log(msg);
    }

    // 错误信息高亮显示在console中
    if ('object' == typeof exception) {
        console.log('\033[31m \033[05m ', exception.message, '\033[0m');

        var logFile =  process._logError.logFile;

        // 如果指定了logFile 错误日志打印到日志文件，否则直接输出
        if (logFile) {
            logFile = require('path').join(process.cwd(), logFile);

            var errorMSG = [msg, exception.stack].join('\n');

            // 追加方式写入文件
            require('fs').appendFile(
                logFile,
                errorMSG,
                function (err) {
                    err && console.log(err);
                }
            );
        } else {
            console.log(exception.stack);
        }
    }
};

/**
 * 格式化输出数据
 * 
 * @param  {Object} data 输出数据对象
 * @return {string}     输出文本
 * @private
 */
global.packJSON = function (data) {
    return JSON.stringify(data, '\t', 4);
};

global.setCookie = function(cookies, context) {
    context = context || this;
    var arr = [];
    var tp = typeof cookies;
    if (tp == 'object') {
        for (var item in cookies) {
            arr.push(item + '=' + cookies[item]);
        }
    } else if (tp == 'array'){
        arr = cookies;
    } else {
        arr.push(cookies);
    }
    context.headers['Set-Cookie'] = arr;
};

global.getContext = require('./getContext');
