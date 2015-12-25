/* global describe:false, it:false */

var postcss = require("postcss"),
    combine = require("../../index.js"),
    fs = require("fs");

require("mocha");
require("should");

module.exports = function () {

    describe("Basic Fixture", function () {

        var i = "test/fixtures/basic.css",
            fixture = fs.readFileSync( i, "utf-8"),
            result;

        postcss([ combine ])
            .process( fixture )
            .then( function ( out ) {
                result = out.css;
            });

        it("Should not be empty", function () {

            result.should.not.be.empty();

        });

        it("Should be the same as /result/", function () {

            fixture.should.equal( result );

        });

        describe("@media", function () {

            it("Should match 0 occurrences", function () {

                result.should.not.match( /@media/ );

            });

        });

        describe("@keyframes", function () {

            it("Should match 1 occurrence", function () {

                result.match( /@keyframes/g ).should.have.length(1);

            });

        });

        describe("@charset", function () {

            it("Should match 1 occurrence", function () {

                result.match( /@charset/ ).should.have.length(1);

            });

        });

    });

};
