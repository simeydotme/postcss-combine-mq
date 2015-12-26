/* global describe:false, it:false */

var postcss = require("postcss"),
    combine = require("../../index.js"),
    fs = require("fs");

require("mocha");
require("should");

describe("css with multiple media queries", function () {

    var i = "test/fixtures/with-multiple-queries.css",
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

    it("should have 2 @media rules", function () {

        result.match( /@media/g ).should.have.length(2);

    });

    it("should have 2 @keyframe rules", function () {

        result.match( /@keyframes/g ).should.have.length(2);

    });

    it("should have 1 @charset rule", function () {

        result.match( /@charset/g ).should.have.length(1);

    });

    describe("background declarations", function () {

        it("should equal 2", function () {

            result.match( /background/g ).should.have.length(2);

        });

    });

    describe("color declarations", function () {

        it("should equal 7", function () {

            result.match( /color/g ).should.have.length(7);

        });

    });

});
