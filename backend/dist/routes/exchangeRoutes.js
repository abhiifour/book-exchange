"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exchangeController_1 = require("../controllers/exchangeController");
const route = (0, express_1.Router)();
// route.get('/:id',getExchanges)
route.post('/', exchangeController_1.createExchange);
route.put('/:id', exchangeController_1.editExhange);
route.get("/:id", exchangeController_1.getAExchange);
route.put("/", exchangeController_1.getExchangeBody);
exports.default = route;
