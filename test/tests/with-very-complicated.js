/* global describe:false, it:false */

var postcss = require("postcss"),
    combine = require("../../index.js"),
    fs = require("fs");

require("mocha");
require("should");


describe("foundation 6 css", function () {

    var i = "test/fixtures/with-very-complicated.css",
        fixture = fs.readFileSync( i, "utf-8"),
        result, declarations = [], colors = [];

    postcss([ combine ])
        .process( fixture )
        .then( function ( out ) {

            out.root.walkDecls( function ( decl ) {
                declarations.push( decl.value );
                if( decl.prop === "color" ) {
                    colors.push(decl.value);
                }
            });

            result = out.css;

        });


    it("should have content", function () {

        result.should.not.be.empty();

    });

    it("should be different to the fixture", function () {

        fixture.should.not.equal( result );

    });

    describe("@media rules", function () {

        it("should equal 15", function () {

            result.match( /@media/g ).should.have.length(15);

        });

        it("should have 2 (min-width: 40em) rules", function () {

            result
                .match( /@media screen and \(min\-width\: 40em\)/g )
                .should.have.length(2);

        });

    });

    it("should have 1 @charset rule", function () {

        result.match( /@charset/g ).should.have.length(1);

    });

    describe("array of color declarations", function () {

        it("should have values", function () {

            colors.should.be.Array();
            colors.length.should.be.above(0);

        });

        it("should equal 89", function () {

            colors.should.have.length(89);

        });

        it("should maintain source order", function () {

            var last = colors.length - 1;

            colors[ 0 ].should.equal( "#000" );
            colors[ 27 ].should.equal( "#0c4d78" );
            colors[ last ].should.equal( "#2199e8" );

        });

    });

});
