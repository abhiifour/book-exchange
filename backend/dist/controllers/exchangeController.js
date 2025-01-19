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
exports.createExchange = createExchange;
exports.editExhange = editExhange;
exports.getExchanges = getExchanges;
exports.getAExchange = getAExchange;
exports.getExchangeBody = getExchangeBody;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createExchange(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const exchange = yield prisma.exchange.findFirst({
            where: {
                fromUser: req.body.fromUserId,
                toUser: req.body.toUserId,
                bookId: req.body.bookId
            }
        });
        try {
            if (!exchange) {
                yield prisma.exchange.create({
                    data: {
                        from: {
                            connect: { id: req.body.fromUserId },
                        },
                        to: {
                            connect: { id: req.body.toUserId },
                        },
                        book: {
                            connect: { id: req.body.bookId },
                        },
                        message: req.body.message,
                        status: 'Pending'
                    }
                });
                return res.json({
                    msg: "exchange created "
                });
            }
            return res.json({
                msg: "exchange already exists"
            });
        }
        catch (error) {
            return res.json(error);
        }
    });
}
function editExhange(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const exchange = yield prisma.exchange.findFirst({
            where: {
                id: req.params.id
            }
        });
        if (exchange) {
            try {
                const exchange = yield prisma.exchange.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        status: req.body.status
                    }
                });
                return res.json({
                    msg: "exchange Updated"
                });
            }
            catch (error) {
                return res.json({
                    error
                });
            }
        }
        return res.json({
            msg: "exchange does not exists "
        });
    });
}
function getExchanges(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exchanges = yield prisma.exchange.findMany({
                where: {
                    toUser: req.params.id
                },
                include: {
                    from: true,
                    to: true,
                    book: true
                }
            });
            return res.json({
                exchanges
            });
        }
        catch (error) {
            return res.json({
                error
            });
        }
    });
}
function getAExchange(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exchange = yield prisma.exchange.findFirst({
                where: {
                    bookId: req.params.id
                },
                include: {
                    from: true,
                    to: true,
                    book: true
                }
            });
            return res.json({
                exchange
            });
        }
        catch (error) {
            return res.json({
                error
            });
        }
    });
}
function getExchangeBody(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exchange = yield prisma.exchange.findFirst({
                where: {
                    id: req.body.id
                },
                include: {
                    from: true,
                    to: true,
                    book: true
                }
            });
            return res.json({
                exchange
            });
        }
        catch (error) {
            return res.json({
                error
            });
        }
    });
}
