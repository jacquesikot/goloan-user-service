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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const events_1 = __importDefault(require("../events/events"));
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
        var _a;
        const { first_name, last_name, phone_number, email, user_type, password } = user;
        const safePassword = (_a = (await hashValue(password))) === null || _a === void 0 ? void 0 : _a.toString();
        try {
            const user = await prisma.users.create({
                data: {
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    password: safePassword,
                    user_type,
                    created_at: new Date().toISOString(),
                },
            });
            if (user) {
                events_1.default.emailEvent.emit(events_1.default.onSignUp, user.email);
                return user;
            }
        }
        catch (error) {
            logger.error(error);
        }
    };
    const findUserByEmail = async (user_email) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email: user_email,
                },
            });
            if (user)
                return user;
            return false;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const findUserByPhone = async (phone_number) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    phone_number,
                },
            });
            if (user)
                return user;
            return false;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const getUserById = async (user_id) => {
        try {
            const user = await prisma.users.findUnique({
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
    const modifiedValue = (modified) => {
        if (modified !== null) {
            const value = Number(modified) + 1;
            return value.toString();
        }
        else
            return '1';
    };
    const updateKYC = async ({ id, gender, year_of_birth, relationship_status, bvn, modified }) => {
        try {
            const updatedUser = await prisma.users.update({
                where: {
                    id,
                },
                data: {
                    bvn,
                    gender,
                    year_of_birth,
                    relationship_status,
                    updated_at: new Date().toISOString(),
                    modified: modifiedValue(modified),
                },
            });
            return updatedUser;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const addPin = async ({ id, pin, modified }) => {
        const safePin = await hashValue(pin);
        try {
            const updatedUser = await prisma.users.update({
                where: {
                    id,
                },
                data: {
                    pin: safePin,
                    updated_at: new Date().toISOString(),
                    modified: modifiedValue(modified),
                },
            });
            return updatedUser;
        }
        catch (error) {
            logger.error(error);
        }
    };
    return {
        hashValue,
        validatePassword,
        createUser,
        findUserByEmail,
        findUserByPhone,
        getUserById,
        updateKYC,
        addPin,
    };
};
exports.default = userService;
//# sourceMappingURL=userService.js.map