"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const authService = ({ logger }) => {
    const validatePassword = async (givenPassword, gottenPassword) => {
        try {
            const validPassword = await bcrypt_1.default.compare(givenPassword, gottenPassword);
            return validPassword;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const generateAuthToken = async (userData) => {
        try {
            const token = jsonwebtoken_1.default.sign(userData, config_1.default.jwtKey);
            return token;
        }
        catch (error) {
            logger.error(error);
        }
    };
    return {
        validatePassword,
        generateAuthToken,
    };
};
exports.default = authService;
//# sourceMappingURL=authService.js.map