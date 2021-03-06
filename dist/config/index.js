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
const dotenv = __importStar(require("dotenv"));
const envFound = dotenv.config();
if (envFound.error && process.env.NODE_ENV === 'development') {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    port: parseInt(process.env.PORT, 3000),
    masterKey: process.env.MASTER_KEY ? process.env.MASTER_KEY : '',
    mailgunApiKey: process.env.MAILGUN_API_KEY ? process.env.MAILGUN_API_KEY : '',
    jwtKey: process.env.JWT_KEY ? process.env.JWT_KEY : '',
    googleMail: process.env.GOOGLE_EMAIL ? process.env.GOOGLE_EMAIL : '',
    googleClientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : '',
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN ? process.env.GOOGLE_REFRESH_TOKEN : '',
};
//# sourceMappingURL=index.js.map