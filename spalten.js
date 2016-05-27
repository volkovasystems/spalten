"use strict";

/*:
	@module-license:
		The MIT License (MIT)

		Copyright (@c) 2016 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"packageName": "spalten",
			"fileName": "spalten.js",
			"moduleName": "spalten",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/spalten.git",
			"testCase": "spalten-test.js",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation
*/

if( typeof window == "undefined" ){
	var harden = require( "harden" );
}

if( typeof window != "undefined" &&
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" );
}

var spalten = function spalten( count ){
	var longerSegment = count / spalten.PARTITION_FACTOR;

	var shorterSegment = count - longerSegment;

	var factor = count / Math.sqrt( Math.pow( longerSegment, 2 ) +
		Math.pow( shorterSegment, 2 ) );

	var pageSize = Math.floor( Math.sqrt( count ) * factor );

	var pageCount = Math.ceil( count / pageSize );

	return {
		"pageSize": pageSize,
		"pageCount": pageCount,
		"factor": factor
	};
};

harden.bind( spalten )
	( "PARTITION_FACTOR", ( ( 1 + Math.sqrt( 5 ) ) / 2 ) );

if( typeof module != "undefined" ){
	module.exports = spalten;
}

if( typeof global != "undefined" ){
	harden
		.bind( spalten )( "globalize",
			function globalize( ){
				harden.bind( global )( "spalten", spalten );
			} );
}
