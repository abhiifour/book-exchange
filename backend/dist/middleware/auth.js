"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jwt = require("jsonwebtoken");
const secret_key = "12345678";
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!(token === null || token === void 0 ? void 0 : token.startsWith("Bearer "))) {
        return res.status(403).json({
            msg: "Access denied"
        });
    }
    if (token) {
        try {
            console.log(token.split(" ")[1]);
            const verifiedToken = jwt.verify(token.split(" ")[1], secret_key);
            // req.email = verifiedToken.email
            if (verifiedToken) {
                return next();
            }
        }
        catch (error) {
            return res.json({
                error
            });
        }
    }
    return res.json({
        msg: "invalid token"
    });
}
