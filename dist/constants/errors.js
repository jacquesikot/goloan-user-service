"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorEnvelope = exports.errorMessage = void 0;
const errorMessage = {
    noDatabaseConnection: 'Could not connect to the database',
    internalServerError: 'Oops, something went wrong. Internal Server Error',
    invalidMasterKey: 'Invalid master key',
    noMasterKey: 'Access Forbidden',
    userAlreadyRegistered: 'User with the given ID is already regisered',
    userDoesNotExist: 'User with given ID does not exist',
    invalidAuth: 'Invalid email and password',
};
exports.errorMessage = errorMessage;
const errorEnvelope = {
    invalidRequest: (error) => {
        return {
            message: error.details[0].message,
            field: error.details[0].context.label,
            type: error.details[0].type,
        };
    },
    genericError: (message, code) => {
        return {
            message,
            code,
        };
    },
};
exports.errorEnvelope = errorEnvelope;
//# sourceMappingURL=errors.js.map