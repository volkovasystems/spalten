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
              		}
              	@end-include
              */

var harden = require("harden");

var spalten = function spalten(count, factor) {
	/*;
                                               	@meta-configuration:
                                               		{
                                               			"count:required": "number",
                                               			"factor": "number"
                                               		}
                                               	@end-meta-configuration
                                               */

	if (typeof count != "number") {
		throw new Error("invalid count");
	}

	factor = factor || spalten.PARTITION_FACTOR;

	if (factor && typeof factor != "number") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWx0ZW4uc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJoYXJkZW4iLCJyZXF1aXJlIiwic3BhbHRlbiIsImNvdW50IiwiZmFjdG9yIiwiRXJyb3IiLCJQQVJUSVRJT05fRkFDVE9SIiwibG9uZ2VyU2VnbWVudCIsInNob3J0ZXJTZWdtZW50IiwiTWF0aCIsInNxcnQiLCJwb3ciLCJwYWdlU2l6ZSIsImZsb29yIiwicGFnZUNvdW50IiwiY2VpbCIsImJpbmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNFQSxJQUFNQSxTQUFTQyxRQUFTLFFBQVQsQ0FBZjs7QUFFQSxJQUFNQyxVQUFVLFNBQVNBLE9BQVQsQ0FBa0JDLEtBQWxCLEVBQXlCQyxNQUF6QixFQUFpQztBQUNoRDs7Ozs7Ozs7O0FBU0EsS0FBSSxPQUFPRCxLQUFQLElBQWdCLFFBQXBCLEVBQThCO0FBQzdCLFFBQU0sSUFBSUUsS0FBSixDQUFXLGVBQVgsQ0FBTjtBQUNBOztBQUVERCxVQUFTQSxVQUFVRixRQUFRSSxnQkFBM0I7O0FBRUEsS0FBSUYsVUFBVSxPQUFPQSxNQUFQLElBQWlCLFFBQS9CLEVBQXlDO0FBQ3hDLFFBQU0sSUFBSUMsS0FBSixDQUFXLGdCQUFYLENBQU47QUFDQTs7QUFFRCxLQUFJRSxnQkFBZ0JKLFFBQVFELFFBQVFJLGdCQUFwQzs7QUFFQSxLQUFJRSxpQkFBaUJMLFFBQVFJLGFBQTdCOztBQUVBLEtBQUlILFNBQVNELFFBQVFNLEtBQUtDLElBQUwsQ0FBV0QsS0FBS0UsR0FBTCxDQUFVSixhQUFWLEVBQXlCLENBQXpCO0FBQy9CRSxNQUFLRSxHQUFMLENBQVVILGNBQVYsRUFBMEIsQ0FBMUIsQ0FEb0IsQ0FBckI7O0FBR0EsS0FBSUksV0FBV0gsS0FBS0ksS0FBTCxDQUFZSixLQUFLQyxJQUFMLENBQVdQLEtBQVgsSUFBcUJDLE1BQWpDLENBQWY7O0FBRUEsS0FBSVUsWUFBWUwsS0FBS00sSUFBTCxDQUFXWixRQUFRUyxRQUFuQixDQUFoQjs7QUFFQSxRQUFPO0FBQ04sVUFBUUEsUUFERjtBQUVOLFdBQVNFLFNBRkg7QUFHTixZQUFVVixNQUhKLEVBQVA7O0FBS0EsQ0FwQ0Q7O0FBc0NBSixPQUFPZ0IsSUFBUCxDQUFhZCxPQUFiO0FBQ0csa0JBREgsRUFDeUIsQ0FBRSxJQUFJTyxLQUFLQyxJQUFMLENBQVcsQ0FBWCxDQUFOLElBQXlCLENBRGxEOztBQUdBTyxPQUFPQyxPQUFQLEdBQWlCaEIsT0FBakIiLCJmaWxlIjoic3BhbHRlbi5zdXBwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cdFx0QG1pdC1saWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJzcGFsdGVuXCIsXG5cdFx0XHRcInBhdGhcIjogXCJzcGFsdGVuL3NwYWx0ZW4uanNcIixcblx0XHRcdFwiZmlsZVwiOiBcInNwYWx0ZW4uanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwic3BhbHRlblwiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiLFxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcblx0XHRcdF0sXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvc3BhbHRlbi5naXRcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0VGhpcyB3aWxsIHJldHVybiBhIGRlZmF1bHQgcGFnaW5hdGlvbiBvYmplY3QuXG5cblx0XHRUaGUgb2JqZWN0IGNvbnRhaW5zLCB0aGUgc2l6ZSwgY291bnQgYW5kIHRoZSBmYWN0b3IgZGV0ZXJtaW5hbnQuXG5cblx0XHRUaGUgaW5pdGlhbCBmYWN0b3IgaXMgdGhlIHBhcnRpdGlvbiBmYWN0b3IsIHRoZSBkaWZmZXJlbmNlIHdpdGggdGhlIGZhY3RvciBkZXRlcm1pbmFudFxuXHRcdFx0aXMgdGhhdCwgaW5pdGlhbCBmYWN0b3IgZGV0ZXJtaW5lcyBob3cgdGhlIGxpc3Qgd2lsbCBiZSBwYXJ0aXRpb24uXG5cdFx0XHRGYWN0b3IgZGV0ZXJtaW5hbnQgZGV0ZXJtaW5lcyB3aGF0IGZhY3RvciByZXN1bHRzIHRvIHRoZSBwYXJ0aXRpb24gb2YgdGhlIGxpc3QuXG5cblx0XHRUaGUgcGFydGl0aW9uIGZhY3RvciBiYWxhbmNlcyBob3cgbWFueSB3aWxsIGJlIGxpc3RlZCBhbmQgaG93IGxvbmcgdGhleSBjYW4gYmUgcHJvY2Vzc2VkLlxuXHRcdFx0VGhpcyB3aWxsIGJlIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIGZhY3RvciBkZXRlcm1pbmFudC5cblxuXHRcdEZhY3RvciBkZXRlcm1pbmFudCBpcyB1c2VkIHRvIGdlbmVyYXRlIHRoZSBwYWdlIHNpemUuXG5cblx0XHRJZiB0aGUgcGFnZSBzaXplIGlzIGdlbmVyYXRlZCBpdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBwYWdlIGNvdW50LlxuXG5cdFx0VGhlIHBhcnRpdGlvbiBmYWN0b3IgYnkgZGVmYXVsdCBpcyB0aGUgZ29sZGVuIHJhdGlvIG51bWJlci5cblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxuXG5cdEBpbmNsdWRlOlxuXHRcdHtcblx0XHRcdFwiaGFyZGVuXCI6IFwiaGFyZGVuXCIsXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcblxuY29uc3Qgc3BhbHRlbiA9IGZ1bmN0aW9uIHNwYWx0ZW4oIGNvdW50LCBmYWN0b3IgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJjb3VudDpyZXF1aXJlZFwiOiBcIm51bWJlclwiLFxuXHRcdFx0XHRcImZhY3RvclwiOiBcIm51bWJlclwiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRpZiggdHlwZW9mIGNvdW50ICE9IFwibnVtYmVyXCIgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBjb3VudFwiICk7XG5cdH1cblxuXHRmYWN0b3IgPSBmYWN0b3IgfHwgc3BhbHRlbi5QQVJUSVRJT05fRkFDVE9SO1xuXG5cdGlmKCBmYWN0b3IgJiYgdHlwZW9mIGZhY3RvciAhPSBcIm51bWJlclwiICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgZmFjdG9yXCIgKTtcblx0fVxuXG5cdGxldCBsb25nZXJTZWdtZW50ID0gY291bnQgLyBzcGFsdGVuLlBBUlRJVElPTl9GQUNUT1I7XG5cblx0bGV0IHNob3J0ZXJTZWdtZW50ID0gY291bnQgLSBsb25nZXJTZWdtZW50O1xuXG5cdHZhciBmYWN0b3IgPSBjb3VudCAvIE1hdGguc3FydCggTWF0aC5wb3coIGxvbmdlclNlZ21lbnQsIDIgKSArXG5cdFx0TWF0aC5wb3coIHNob3J0ZXJTZWdtZW50LCAyICkgKTtcblxuXHRsZXQgcGFnZVNpemUgPSBNYXRoLmZsb29yKCBNYXRoLnNxcnQoIGNvdW50ICkgKiBmYWN0b3IgKTtcblxuXHRsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKCBjb3VudCAvIHBhZ2VTaXplICk7XG5cblx0cmV0dXJuIHtcblx0XHRcInNpemVcIjogcGFnZVNpemUsXG5cdFx0XCJjb3VudFwiOiBwYWdlQ291bnQsXG5cdFx0XCJmYWN0b3JcIjogZmFjdG9yXG5cdH07XG59O1xuXG5oYXJkZW4uYmluZCggc3BhbHRlbiApXG5cdCggXCJQQVJUSVRJT05fRkFDVE9SXCIsICggKCAxICsgTWF0aC5zcXJ0KCA1ICkgKSAvIDIgKSApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNwYWx0ZW47XG4iXX0=
//# sourceMappingURL=spalten.support.js.map
