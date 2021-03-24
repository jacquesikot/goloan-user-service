"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const database_1 = require("./database");
exports.default = {
    prisma: database_1.prisma,
    logger: logger_1.default,
};
//# sourceMappingURL=serviceContainer.js.map