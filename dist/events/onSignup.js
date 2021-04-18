"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loaders_1 = require("../loaders");
const onSignUp = async (email) => {
    try {
        await loaders_1.container.mailService.sendWelcomeMail(email);
        console.log('Welcome Email Sent');
        return;
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = onSignUp;
//# sourceMappingURL=onSignup.js.map