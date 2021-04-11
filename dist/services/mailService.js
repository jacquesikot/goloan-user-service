"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loaders_1 = require("../loaders");
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const config_1 = __importDefault(require("../config"));
const mailService = () => {
    const domain = 'https://app.mailgun.com/app/sending/domains/sandbox9e1f2ca8e8a54772a28b0eab85665d40.mailgun.org';
    const fromWho = 'jacquesikot@gmail.com';
    const mailgun = new mailgun_js_1.default({ apiKey: config_1.default.mailgunApiKey, domain: domain });
    const data = {
        from: fromWho,
        to: 'jacquesikot@icloud.com',
        subject: 'Hello from user service',
        html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' +
            'jacquesikot@icloud.com' +
            '">Click here to add your email address to a mailing list</a>',
    };
    const sendMail = async () => {
        try {
            await mailgun.messages().send(data);
        }
        catch (error) {
            loaders_1.logger.error(error);
        }
    };
    return {
        sendMail,
    };
};
exports.default = mailService;
//# sourceMappingURL=mailService.js.map