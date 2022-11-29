"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv").config();
const generateAcessToken = (user) => {
    const payload = user;
    const privateKey = {
        key: String(process.env.ACCESS_TOKEN),
        passphrase: "hello",
    };
    const sigInOption = {
        algorithm: "RS256",
        expiresIn: "1h",
    };
    return (0, jsonwebtoken_1.sign)(payload, privateKey, sigInOption);
};
