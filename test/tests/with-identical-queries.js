/* global describe:false, it:false */

var postcss = require("postcss"),
    combine = require("../../index.js"),
    fs = require("fs");

require("mocha");
require("should");

module.exports = function () {

    describe("css with identical queries", function () {

        var i = "test/fixtures/with-identical-queries.css",
            fixture = fs.readFileSync( i, "utf-8"),
            result, colors = [];

        postcss([ combine ])
            .process( fixture )
            .then( function ( out ) {

                out.root.walkDecls( function ( decl ) {
                    colors.push( decl.value );
                });

                result = out.css;

            });


        it("should have content", function () {

            result.should.not.be.empty();

        });

        it("should be different to fixture", function () {

            fixture.should.not.equal( result );

        });

        it("should have 1 @media rule", function () {

            result.match( /@media/g ).should.have.length(1);

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

        describe("array of output colors", function () {

            it("should have values", function () {

                colors.should.be.Array();
                colors.length.should.be.above(0);

            });

            it("should maintain source order", function () {

                colors[ 5 ].should.equal( "brown" );
                colors[ 6 ].should.equal( "black" );
                colors[ colors.length - 1 ].should.equal( "yellow" );

            });

        });

    });

};
