"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fermer = exports.db = exports.connect = void 0;
const mongodb_1 = require("mongodb");
let client;
const connect = (url, cb) => {
    if (client === null) {
        client = new mongodb_1.MongoClient(url);
        client.connect((err) => {
            if (err) {
                client = null;
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
    let db = new mongodb_1.Db(client, "dbOk");
    return db;
};
exports.db = db;
const fermer = () => {
    if (client) {
        client.close();
        client = null;
    }
};
exports.fermer = fermer;
