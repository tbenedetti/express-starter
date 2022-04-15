'use strict';

const codes = new Map([
        [400, 'Bad Request'],
        [401, 'Unauthorized'],
        [403, 'Forbidden'],
        [404, 'Not Found'],
        [405, 'Method Not Allowed'],
        [408, 'Request Time-out'],
        [409, 'Conflict'],
        [429, 'Too Many Requests'],
        [431, 'Request Header Fields Too Large'],
        [451, 'Unavailable For Legal Reasons'],
        [500, 'Internal Server Error'],
        [501, 'Not Implemented'],
        [503, 'Service Unavailable']
    ]);

module.exports = class ApiError extends Error {

    constructor({id, statusCode, error, messages}) {
        super(error);
        this.name = 'ApiError';
        this.isApiError = true;

        this.id = id;
        this.statusCode = statusCode || 500;
        this.error = codes.get(this.statusCode) || codes.get(500);
        this.messages = (Array.isArray(messages) ? messages : [messages]).filter(a => !! a);
    }

    /**
     * This method is used to serialize the Error into JSON for the API response
     * @returns {{message, reqId, errors: (*|null)}}
     */
    toJSON() {
        return {
            id: this.id,
            statusCode: this.statusCode,
            error: this.error,
            messages: this.messages
        };
    }

    static internalError(id) {
        return new ApiError({
            id,
            statusCode: 500
        })
    }
    static badRequest({id, messages}) {
        return new ApiError({
            id,
            statusCode: 400,
            messages
        });
    }
}

