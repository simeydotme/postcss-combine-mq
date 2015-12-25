/* global describe:false, it:false */

var postcss = require("postcss"),
    combine = require("../../index.js"),
    fs = require("fs");

require("mocha");
require("should");

module.exports = function () {

    describe("Basic Fixture", function () {

        var i = "test/fixtures/basic.css",
            o = "test/fixtures/results/basic.css",
            fixture = fs.readFileSync( i, "utf-8");

        postcss([ combine ])
            .process( fixture )
            .then(function (result) {
                fs.writeFileSync( o, result.css );
            });

        it("Should not be empty", function () {

            var result = fs.readFileSync( o, "utf-8");
            result.should.not.be.empty();

        });

        it("Should be the same as /result/", function () {

            var result = fs.readFileSync( o, "utf-8");
            fixture.should.equal( result );

        });

        describe("@media", function () {

            it("Should match 0 occurrences", function () {

                var result = fs.readFileSync( o, "utf-8");
                result.should.not.match( /@media/ );

            });

        });

        describe("@keyframes", function () {

            it("Should match 1 occurrence", function () {

                var result = fs.readFileSync( o, "utf-8");
                result.match( /@keyframes/g ).should.have.length(1);

            });

        });

        describe("@charset", function () {

            it("Should match 1 occurrence", function () {

                var result = fs.readFileSync( o, "utf-8");
                result.match( /@charset/ ).should.have.length(1);

            });

        });

    });

};
