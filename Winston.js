var winston = require('winstone');
var winstonDaily = require('winstone-daily-rotate-file');
// Daily log processing module
var moment = require('moment');

function timestampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
};


var logger = new (winstone.Logger)({
    transports: [
        new (winstonDaily)({
            name: 'info-file',
            filename: './log/server',
            datePattern: '_YYYY-MM-dd.log',
            colorize: false,
            maxsize: 50000000,
            maxFiles: 1000,
            level: 'info',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        }),
        new (winston.transports.Console)({
            name: 'debug-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
    ],
    exepctionHandlers: [
        new (winstonDaily)({
            name: 'info-file',
            filename: './log/server',
            datePattern: '_YYYY-MM-dd.log',
            colorize: false,
            maxsize: 50000000,
            maxFiles: 1000,
            level: 'info',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        }),
        new (winston.transports.Console)({
            name: 'debug-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
    ]
});

var fs = require('fs');

var inname= './outpout.txt';
var outname = './output2.txt';

fs.exists(outname, function (exists) {
    if (exists) {
        fs.unlink(outname, function (err) {
            if (err) throw err;
            logger.info(' Existing file [' + outname +'] Deleted.');
        });
    }

    var infile = fs.createReadStream(inname, {flags: 'r'} );
    var outfile = fs.createWriteStream(outname, {flags: 'w'});

    infile.pipe(outfile);
    logger.info(' Copy file [' + inname + '] -> [' + outname = ']');
});
            
