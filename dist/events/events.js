"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const onSignup_1 = __importDefault(require("./onSignup"));
const onSignUpText = 'onUserSignUp';
const emailEvent = new events_1.default();
emailEvent.addListener(onSignUpText, onSignup_1.default);
exports.default = {
    onSignUp: onSignUpText,
    emailEvent,
};
//# sourceMappingURL=events.js.map