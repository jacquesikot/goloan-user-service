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
const bcrypt = __importStar(require("bcrypt"));
const userService = ({ prisma, logger }) => {
    const hashValue = async (value) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedValue = await bcrypt.hash(value, salt);
            return hashedValue;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const validatePassword = async (givenPassword, userPassword) => {
        try {
            const validPassword = await bcrypt.compare(givenPassword, userPassword);
            if (!validPassword)
                return false;
            return true;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const createUser = async (user) => {
        var _a, _b;
        const { first_name, last_name, phone_number, email, gender, bvn, user_type, password, pin, } = user;
        const safePassword = (_a = (await hashValue(password))) === null || _a === void 0 ? void 0 : _a.toString();
        const safePin = (_b = (await hashValue(pin))) === null || _b === void 0 ? void 0 : _b.toString();
        try {
            const user = prisma.users.create({
                data: {
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    password: safePassword,
                    pin: safePin,
                    gender,
                    bvn,
                    user_type,
                    created_at: new Date().toISOString(),
                },
            });
            return user;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const checkIfUserExists = async (user_email) => {
        try {
            const foundUser = await prisma.users.findUnique({
                where: {
                    email: user_email,
                },
            });
            if (!foundUser)
                return false;
            return true;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const findUserByEmail = async (user_email) => {
        try {
            const user = prisma.users.findUnique({
                where: {
                    email: user_email,
                },
            });
            return user;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const getUserById = async (user_id) => {
        try {
            const user = prisma.users.findUnique({
                where: {
                    id: user_id,
                },
            });
            if (user)
                return user;
        }
        catch (error) {
            logger.error(error);
        }
    };
    return {
        hashValue,
        validatePassword,
        createUser,
        checkIfUserExists,
        findUserByEmail,
        getUserById,
    };
};
exports.default = userService;
//# sourceMappingURL=userService.js.map