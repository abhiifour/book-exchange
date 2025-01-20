"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.signup = signup;
exports.getUserData = getUserData;
exports.setPreferences = setPreferences;
const client_1 = require("@prisma/client");
const jwt = require("jsonwebtoken");
const secret_key = "12345678";
const prisma = new client_1.PrismaClient();
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({
            where: {
                email: req.body.email
            },
            include: {
                books: true,
                sentExchanges: true,
                receivedExchanges: true
            }
        });
        if (user) {
            if (user.password != req.body.password) {
                return res.json({
                    msg: 'incorrect password'
                });
            }
            const token = jwt.sign({ email: req.body.email }, secret_key, {
                expiresIn: "10h"
            });
            return res.json({
                user,
                token
            });
        }
        return res.json({
            msg: "user does not exists"
        });
    });
}
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            try {
                yield prisma.user.create({
                    data: {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        preferences: []
                    }
                });
                return res.status(200).json({
                    msg: "user created successfully"
                });
            }
            catch (error) {
                return res.status(400).json({
                    msg: error
                });
            }
        }
        return res.json({
            msg: "user already exists"
        });
    });
}
function getUserData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findFirst({
                where: {
                    id: req.body.id
                },
                include: {
                    books: true
                }
            });
            if (user)
                return res.json({
                    user
                });
            return res.json({
                msg: "user does not exist"
            });
        }
        catch (error) {
            res.json({
                error
            });
        }
    });
}
function setPreferences(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.update({
                where: {
                    id: req.body.id
                },
                data: {
                    preferences: req.body.preferences
                }
            });
            if (user)
                return res.json({
                    user
                });
            return res.json({
                msg: "user does not exist"
            });
        }
        catch (error) {
            res.json({
                error
            });
        }
    });
}
