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
const _ = __importStar(require("lodash"));
const serviceContainer_1 = require("../../loaders/serviceContainer");
const validation_1 = require("../../validation");
const constants_1 = require("../../constants");
const router = express.Router();
router.post('/', async (req, res) => {
    const validation = validation_1.userValidation(req.body);
    if (validation.error)
        return res.status(400).send(constants_1.errorEnvelope.invalidRequest(validation.error));
    const existingUser = await serviceContainer_1.container.userService.checkIfUserExists(req.body.email);
    if (existingUser)
        return res
            .status(400)
            .send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.userAlreadyRegistered, 400));
    const newUser = await serviceContainer_1.container.userService.createUser(req.body);
    res
        .status(201)
        .send(constants_1.responseEnvelope.single(_.pick(newUser, [
        'id',
        'first_name',
        'last_name',
        'gender',
        'email',
        'phone_number',
    ])));
});
router.get('/:id', async (req, res) => {
    const user = await serviceContainer_1.container.userService.getUserById(req.params.id);
    if (!user)
        return res
            .status(400)
            .send(constants_1.errorEnvelope.genericError(constants_1.errorMessage.userDoesNotExist, 400));
    res.send(constants_1.responseEnvelope.single(user));
});
exports.default = router;
//# sourceMappingURL=users.js.map