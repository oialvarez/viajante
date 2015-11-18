'use strict';

var fs = require('fs'),
    config = require('meanio').loadConfig(),
    mkdirOrig = fs.mkdir,
    FILES_ROOT_PATH = '/files/public',
    directory = config.root + FILES_ROOT_PATH,
    osSep = '/';


var rename = function (file, dest, user, callback) {
    var dir = directory + '/' + user.name + '/';
    fs.rename(file.path, dir + dest + file.name, function (err) {
        if (err) throw err;
        else
            callback({
                success: true,
                file: {
                    src: FILES_ROOT_PATH + user.name + dest + file.name,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    created: Date.now(),
                    createor: (user) ? {
                        id: user.id,
                        name: user.name
                    } : {}
                }
            });
    });
}

var mkdir_p = function (path, callback, position) {
    var parts = require('path').normalize(path).split(osSep);

    position = position || 0;

    if (position >= parts.length) {
        return callback();
    }

    var directory = parts.slice(0, position + 1).join(osSep) || osSep;
    fs.stat(directory, function (err) {
        if (err === null) {
            mkdir_p(path, callback, position + 1);
        } else {
            mkdirOrig(directory, function (err) {
                if (err && err.code !== 'EEXIST') {
                    return callback(err);
                } else {
                    mkdir_p(path, callback, position + 1);
                }
            });
        }
    });
}

var publishEvent = function (MeanUpload, user, data) {
    if (config.hostname && data.success)
        MeanUpload.events.publish({
            action: 'uploaded',
            user: {
                name: user
            },
            name: data.file.name,
            url: config.hostname + data.file.src,
            data: {
                size: data.file.size,
                type: data.file.type,
                url: config.hostname + data.file.src,
                file_name: data.file.name
            }
        });
}

module.exports = function (MeanUpload) {
    return {
        upload: function (req, res) {
            var dir = directory + '/' + req.user.name + '/';
            var path = dir + req.body.dest;
            if (!fs.existsSync(path)) {
                mkdir_p(path, function (err) {
                    rename(req.files.file, req.body.dest, req.user, function (data) {
                        publishEvent(MeanUpload, req.user.name, data);
                        res.jsonp(data);
                    });
                });
            } else {
                rename(req.files.file, req.body.dest, req.user, function (data) {
                    publishEvent(MeanUpload, req.user.name, data);
                    res.jsonp(data);
                });
            }
        }
    }
};