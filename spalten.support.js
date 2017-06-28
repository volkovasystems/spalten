"use strict";

/*;
              	@module-license:
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
              	@end-module-license
              
              	@module-configuration:
              		{
              			"package": "spalten",
              			"path": "spalten/spalten.js",
              			"file": "spalten.js",
              			"module": "spalten",
              			"author": "Richeve S. Bebedor",
              			"eMail": "richeve.bebedor@gmail.com",
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
              				"Vinse Vinalon <vinsevinalon@gmail.com>"
              			],
              			"repository": "https://github.com/volkovasystems/spalten.git",
              			"global": true
              		}
              	@end-module-configuration
              
              	@module-documentation:
              		This will return a default pagination object.
              
              		The object contains, the size, count and the factor determinant.
              
              		The initial factor is the partition factor, the difference with the factor determinant
              			is that, initial factor determines how the list will be partition.
              			Factor determinant determines what factor results to the partition of the list.
              
              		The partition factor balances how many will be listed and how long they can be processed.
              			This will be used to generate the factor determinant.
              
              		Factor determinant is used to generate the page size.
              
              		If the page size is generated it will be used to determine the page count.
              
              		The partition factor by default is the golden ratio number.
              	@end-module-documentation
              
              	@include:
              		{
              			"harden": "harden",
              			"protype": "protype"
              		}
              	@end-include
              */

var harden = require("harden");
var protype = require("protype");

var spalten = function spalten(count, factor) {
	/*;
                                               	@meta-configuration:
                                               		{
                                               			"count:required": "number",
                                               			"factor": "number"
                                               		}
                                               	@end-meta-configuration
                                               */

	if (!protype(count, NUMBER)) {
		throw new Error("invalid count");
	}

	factor = factor || spalten.PARTITION_FACTOR;

	if (factor && !protype(factor, NUMBER)) {
		throw new Error("invalid factor");
	}

	var longerSegment = count / spalten.PARTITION_FACTOR;

	var shorterSegment = count - longerSegment;

	var factor = count / Math.sqrt(Math.pow(longerSegment, 2) +
	Math.pow(shorterSegment, 2));

	var pageSize = Math.floor(Math.sqrt(count) * factor);

	var pageCount = Math.ceil(count / pageSize);

	return {
		"size": pageSize,
		"count": pageCount,
		"factor": factor };

};

harden.bind(spalten)(
"PARTITION_FACTOR", (1 + Math.sqrt(5)) / 2);

module.exports = spalten;

//# sourceMappingURL=spalten.support.js.map