

const ApiError = require('../../src/errors/api-error');

describe('api-error', function() {

    it("toJSON-test", function () {

        const error = ApiError.badRequest({id:'123', messages:'illegal scrum meeting'});

        expect(JSON.stringify(error))
            .toBe(`{"id":"123","statusCode":400,"error":"Bad Request","messages":["illegal scrum meeting"]}`)

    });
})
