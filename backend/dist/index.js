"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("./auth");
const auth_2 = require("./middleware/auth");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const exchangeRoutes_1 = __importDefault(require("./routes/exchangeRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = express();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express.json());
app.post('/login', auth_1.login);
app.post('/signup', auth_1.signup);
app.post('/', auth_2.verifyToken, auth_1.getUserData);
app.use('/books', auth_2.verifyToken, bookRoutes_1.default);
app.use('/exchange', auth_2.verifyToken, exchangeRoutes_1.default);
app.listen(3000, () => {
    console.log("Server is OK");
});
