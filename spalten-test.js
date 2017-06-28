
const assert = require( "assert" );
const spalten = require( "./spalten.js" );

assert.equal( typeof spalten( 4, 2 ) == "object", true, "should be true" );

assert.deepEqual( spalten( 5, 2 ), { "size": 3, "count": 2, "factor": 1.3763819204711736 }, "should be deeply equal" );

console.log( "ok" );
