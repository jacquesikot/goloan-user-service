"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loaders_1 = require("../../loaders");
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    const mail = await loaders_1.container.mailService.sendMail();
    res.send(mail);
});
exports.default = router;
//# sourceMappingURL=home.js.map