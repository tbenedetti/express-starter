class ApiError extends Error {

    constructor(reqId, code = 500, message = 'Internal Server Error') {
        super();
        this.message = message;
        this.reqId = reqId;
        this.code = Number.isInteger(code) ? code : 500;
    }

    static instance(id, code, msg) {
        return new ApiError(id, code, msg);
    }

    static badRequest(msg) {
        return new ApiError(null, 400, msg);
    }

    static notFound(id, msg) {
        return new ApiError(id, 404, msg);
    }

    static internalServer(id) {
        return new ApiError(id);
    }

    static notAuthorized(id, msg) {
        return new ApiError(id, 401, msg);
    }
}

module.exports = ApiError;