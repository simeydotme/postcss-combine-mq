var postcss = require("postcss");

module.exports = postcss.plugin("postcss-combine-mq", function () {


    var

        /**
         * helper for removing whitespace from comparions
         * on the media queries
         *
         * @param  {string} query // the media query we're comparing
         * @return {string}       // the media query without spacing
         */
        replaceWhitespace = function ( query ) {

            return query.replace( /[\s\t\n\r]/gi, "" );

        },

        /**
         * the main method for combining any queries
         * which are the same. simple string comparison.
         *
         * @param  {object} css // the CSSOM object provided by Postcss
         */
        combine = function ( css ) {

            /**
             * if we have some css...
             */
            if ( css.nodes.length ) {

                /**
                 * walk through the media @rules of the CSSOM
                 */
                css.walkAtRules( "media", function ( firstQuery ) {

                    /**
                     * save the parameters (media query) of every
                     * media @rule we find
                     */
                    var firstQueryParams = replaceWhitespace( firstQuery.params );

                    /**
                     * now walk through all the @rules of the CSSOM again
                     */
                    css.walkAtRules( "media", function ( secondQuery ) {

                        /**
                         * check that the current @rule is not the original
                         * @rule we found
                         */
                        if ( css.index( firstQuery ) !== css.index( secondQuery ) ) {

                            /**
                             * save the parameters (media query) of the
                             * current @rule we're comparing
                             */
                            var secondQueryParams = replaceWhitespace( secondQuery.params );

                            /**
                             * if our original media query is the same as
                             * out current one
                             */
                            if ( firstQueryParams === secondQueryParams ) {

                                /**
                                 * move all the rules inside current @rule to the
                                 * original @rule we found, and remove this @rule
                                 */
                                secondQuery.walkRules( function ( rule ) {

                                    rule.moveTo( firstQuery );

                                });

                                secondQuery.remove();

                            }

                        }

                    });

                });

            }

        };

    return combine;

});
