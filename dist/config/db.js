"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fermer = exports.db = exports.connect = exports.client = void 0;
const mongodb_1 = require("mongodb");
const connect = (url, cb) => {
    if (exports.client === null) {
        exports.client = new mongodb_1.MongoClient(url);
        exports.client.connect((err) => {
            if (err) {
                exports.client = null;
                cb(err);
            }
            else {
                cb();
            }
        });
    }
    else {
        cb();
    }
};
exports.connect = connect;
const db = () => {
    let db = new mongodb_1.Db(exports.client, "dbOk");
    return db;
};
exports.db = db;
const fermer = () => {
    if (exports.client) {
        exports.client.close();
        exports.client = null;
    }
};
exports.fermer = fermer;
