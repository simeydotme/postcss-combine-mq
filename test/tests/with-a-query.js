/* global describe:false, it:false */

var postcss = require("postcss"),
    combine = require("../../index.js"),
    fs = require("fs");

require("mocha");
require("should");

module.exports = function () {

    describe("css with a media query", function () {

        var i = "test/fixtures/with-a-query.css",
            fixture = fs.readFileSync( i, "utf-8"),
            result;

        postcss([ combine ])
            .process( fixture )
            .then( function ( out ) {
                result = out.css;
            });

        it("should have content", function () {

            result.should.not.be.empty();

        });

        it("should be the same as fixture", function () {

            fixture.should.equal( result );

        });

        it("should have 1 @media rule", function () {

            result.match( /@media/g ).should.have.length(1);

        });

        it("should have 1 @keyframe rule", function () {

            result.match( /@keyframes/g ).should.have.length(1);

        });

        it("should have 1 @charset rule", function () {

            result.match( /@charset/g ).should.have.length(1);

        });

        describe("color declarations", function () {

            it("should equal 5", function () {

                result.match( /color/g ).should.have.length(5);

            });

        });

    });

};
