/* global describe:false, it:false */

var postcss = require("postcss"),
    combine = require("../../index.js"),
    fs = require("fs");

require("mocha");
require("should");

describe("basic css", function () {

    var i = "test/fixtures/basic.css",
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

    it("should have 0 @media rules", function () {

        result.should.not.match( /@media/g );

    });

    it("should have 1 @keyframes rule", function () {

        result.match( /@keyframes/g ).should.have.length(1);

    });

    it("should have 1 @charset rule", function () {

        result.match( /@charset/g ).should.have.length(1);

    });

    describe("color declarations", function () {

        it("should equal 3", function () {

            result.match( /color/g ).should.have.length(3);

        });

    });


});
