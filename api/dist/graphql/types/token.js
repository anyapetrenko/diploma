"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Token {
    static typeDefs() {
        return `
            type Token {
                token: String
            }
        `;
    }
}
exports.default = Token;