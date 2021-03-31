"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const loaders_1 = require("../../loaders");
const validation_1 = require("../../validation");
const constants_1 = require("../../constants");
const router = express.Router();
router.post('/', async (req, res) => {
    const statusCode = 400;
    const validation = validation_1.authValidation(req.body);
    if (validation.error)
        return res.status(statusCode).send(constants_1.errorEnvelope.invalidRequest(validation.error));
    const user = await loaders_1.container.userService.findUserByEmail(req.body.email);
    if (!user)
        return res.status(statusCode).send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.invalidAuth, statusCode));
    const validPassword = await loaders_1.container.authService.validatePassword(req.body.password, user.password);
    if (!validPassword)
        return res.status(statusCode).send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.invalidAuth, statusCode));
    const token = await loaders_1.container.authService.generateAuthToken(user);
    const data = {
        token,
    };
    res.send(constants_1.responseEnvelope.single(data));
});
exports.default = router;
//# sourceMappingURL=auth.js.map