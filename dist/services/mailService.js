"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
// import { logger } from '../loaders';
const config_1 = __importDefault(require("../config"));
const OAuth2 = googleapis_1.google.auth.OAuth2;
const createTransporter = async () => {
    const oauth2Client = new OAuth2(config_1.default.googleClientId, config_1.default.googleClientSecret, 'https://developers.google.com/oauthplayground');
    oauth2Client.setCredentials({
        refresh_token: config_1.default.googleRefreshToken,
    });
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject('Failed to create access token :(');
            }
            resolve(token);
        });
    });
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config_1.default.googleMail,
            accessToken,
            clientId: config_1.default.googleClientId,
            clientSecret: config_1.default.googleClientSecret,
            refreshToken: config_1.default.googleRefreshToken,
        },
    });
    return transporter;
};
const mailService = () => {
    const sendWelcomeMail = async (email) => {
        const welcomeMailOptions = {
            from: config_1.default.googleMail,
            to: email,
            subject: 'Welcome to Goloan',
            text: '<h1>Welcoem to Goloan</h1>',
        };
        try {
            const emailTransporter = await createTransporter();
            await emailTransporter.sendMail(welcomeMailOptions);
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        sendWelcomeMail,
    };
};
exports.default = mailService;
//# sourceMappingURL=mailService.js.map