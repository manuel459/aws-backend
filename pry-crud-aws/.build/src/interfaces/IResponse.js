"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
class ResponseHandler {
    success(data, message = 'Éxito', status = 200) {
        return {
            status: status,
            succest: true,
            message: message,
            body: data,
        };
    }
    error(status, message) {
        return {
            status: status,
            succest: false,
            message: Array.isArray(message) ? message : [message],
        };
    }
}
exports.ResponseHandler = ResponseHandler;
