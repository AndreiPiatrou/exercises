const assert = require('assert');
const { data } = require('./../index');

describe('some functionName ', function() {
    it('some check', function() {
        assert.ok(data, 'data should be defined');
    });
})
