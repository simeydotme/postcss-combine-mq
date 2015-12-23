var postcss = require("postcss");

module.exports = postcss.plugin("postcss-combine-mq", function () {

    return function ( css, result ) {

        if ( css.nodes.length ) {

            css.walkAtRules( "media", function ( firstQuery ) {

                var firstQueryParams = firstQuery.params.replace( /[\s\t\n\r]/gi , "" );

                css.walkAtRules( "media", function ( secondQuery ) {

                    if ( css.index( firstQuery ) !== css.index( secondQuery ) ) {
                
                        var secondQueryParams = secondQuery.params.replace( /[\s\t\n\r]/gi , "" );

                        if ( firstQueryParams === secondQueryParams ) {

                            secondQuery.walkRules( function( rule ) {

                                rule.moveTo( firstQuery );

                            });

                            secondQuery.remove();

                        }

                    }

                });

            });

        }

    };

});
