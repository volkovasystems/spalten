"use strict";

/*;
	@test-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
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
	@end-test-license

	@test-configuration:
		{
			"package": "spalten",
			"path": "spalten/test.module.js",
			"file": "test.module.js",
			"module": "test",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/spalten.git"
		}
	@end-test-configuration

	@test-documentation:

	@end-test-documentation

	@include:
		{
			"assert": "should",
			"spalten": "spalten"
		}
	@end-include
*/

const assert = require( "should" );

//: @server:
const spalten = require( "./spalten.js" );
//: @end-server

//: @client:
const spalten = require( "./spalten.support.js" );
//: @end-client

//: @bridge:
const path = require( "path" );
//: @end-bridge


//: @server:

describe( "spalten", ( ) => {

	describe( "`spalten( 5, 2 )`", ( ) => {

		it( "should return object type", ( ) => {
			assert.equal( typeof spalten( 4, 2 ), "object" );
		} );

		it( "should be equal to { 'size': 3, 'count': 2, 'factor': 1.3763819204711736 }", ( ) => {
			assert.deepEqual( spalten( 5, 2 ), { "size": 3, "count": 2, "factor": 1.3763819204711736 } );
		} );

	} );

} );

//: @end-server


//: @client:

describe( "spalten", ( ) => {

	describe( "`spalten( 5, 2 )`", ( ) => {

		it( "should return object type", ( ) => {
			assert.equal( typeof spalten( 4, 2 ), "object" );
		} );

		it( "should be equal to { 'size': 3, 'count': 2, 'factor': 1.3763819204711736 }", ( ) => {
			assert.deepEqual( spalten( 5, 2 ), { "size": 3, "count": 2, "factor": 1.3763819204711736 } );
		} );

	} );

} );

//: @end-client


//: @bridge:

describe( "spalten", ( ) => {

	let bridgeURL = `file://${ path.resolve( __dirname, "bridge.html" ) }`;

	describe( "`spalten( 5, 2 )`", ( ) => {

		it( "should return object type", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					return typeof spalten( 4, 2 );
				}

			).value;
			//: @end-ignore
			assert.equal( result, "object" );

		} );

		it( "should be equal to { 'size': 3, 'count': 2, 'factor': 1.3763819204711736 }", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					return JSON.stringify( spalten( 5, 2 ) );
				}

			).value;
			//: @end-ignore
			assert.deepEqual( JSON.parse( result ), { "size": 3, "count": 2, "factor": 1.3763819204711736 } );

		} );

	} );

} );

//: @end-bridge
