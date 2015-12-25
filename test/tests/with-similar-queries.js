/* global describe:false, it:false */

var postcss = require("postcss"),
    combine = require("../../index.js"),
    fs = require("fs");

require("mocha");
require("should");

module.exports = function () {

    describe("css with many similar queries", function () {

        var i = "test/fixtures/with-similar-queries.css",
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

        it("should be different to the fixture", function () {

            fixture.should.not.equal( result );

        });

        it("should have 3 @media rules", function () {

            result.match( /@media/g ).should.have.length(3);

        });

        it("should have 2 @keyframe rules", function () {

            result.match( /@keyframes/g ).should.have.length(2);

        });

        it("should have 1 @charset rule", function () {

            result.match( /@charset/g ).should.have.length(1);

        });

        describe("background declarations", function () {

            it("should equal 4", function () {

                result.match( /background/g ).should.have.length(4);

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

                var last = colors.length - 1;

                colors[ 4 ].should.equal( "turquoise" );
                colors[ 5 ].should.equal( "rust" );
                colors[ last ].should.equal( "indigo" );

            });

        });

    });

};
