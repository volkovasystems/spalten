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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWx0ZW4uc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJoYXJkZW4iLCJyZXF1aXJlIiwic3BhbHRlbiIsImNvdW50IiwiZmFjdG9yIiwiRXJyb3IiLCJQQVJUSVRJT05fRkFDVE9SIiwibG9uZ2VyU2VnbWVudCIsInNob3J0ZXJTZWdtZW50IiwiTWF0aCIsInNxcnQiLCJwb3ciLCJwYWdlU2l6ZSIsImZsb29yIiwicGFnZUNvdW50IiwiY2VpbCIsImJpbmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNFQSxJQUFNQSxTQUFTQyxRQUFTLFFBQVQsQ0FBZjs7QUFFQSxJQUFNQyxVQUFVLFNBQVNBLE9BQVQsQ0FBa0JDLEtBQWxCLEVBQXlCQyxNQUF6QixFQUFpQztBQUNoRDs7Ozs7Ozs7O0FBU0EsS0FBSSxPQUFPRCxLQUFQLElBQWdCLFFBQXBCLEVBQThCO0FBQzdCLFFBQU0sSUFBSUUsS0FBSixDQUFXLGVBQVgsQ0FBTjtBQUNBOztBQUVERCxVQUFTQSxVQUFVRixRQUFRSSxnQkFBM0I7O0FBRUEsS0FBSUYsVUFBVSxPQUFPQSxNQUFQLElBQWlCLFFBQS9CLEVBQXlDO0FBQ3hDLFFBQU0sSUFBSUMsS0FBSixDQUFXLGdCQUFYLENBQU47QUFDQTs7QUFFRCxLQUFJRSxnQkFBZ0JKLFFBQVFELFFBQVFJLGdCQUFwQzs7QUFFQSxLQUFJRSxpQkFBaUJMLFFBQVFJLGFBQTdCOztBQUVBLEtBQUlILFNBQVNELFFBQVFNLEtBQUtDLElBQUwsQ0FBV0QsS0FBS0UsR0FBTCxDQUFVSixhQUFWLEVBQXlCLENBQXpCO0FBQy9CRSxNQUFLRSxHQUFMLENBQVVILGNBQVYsRUFBMEIsQ0FBMUIsQ0FEb0IsQ0FBckI7O0FBR0EsS0FBSUksV0FBV0gsS0FBS0ksS0FBTCxDQUFZSixLQUFLQyxJQUFMLENBQVdQLEtBQVgsSUFBcUJDLE1BQWpDLENBQWY7O0FBRUEsS0FBSVUsWUFBWUwsS0FBS00sSUFBTCxDQUFXWixRQUFRUyxRQUFuQixDQUFoQjs7QUFFQSxRQUFPO0FBQ04sVUFBUUEsUUFERjtBQUVOLFdBQVNFLFNBRkg7QUFHTixZQUFVVixNQUhKLEVBQVA7O0FBS0EsQ0FwQ0Q7O0FBc0NBSixPQUFPZ0IsSUFBUCxDQUFhZCxPQUFiO0FBQ0csa0JBREgsRUFDeUIsQ0FBRSxJQUFJTyxLQUFLQyxJQUFMLENBQVcsQ0FBWCxDQUFOLElBQXlCLENBRGxEOztBQUdBTyxPQUFPQyxPQUFQLEdBQWlCaEIsT0FBakIiLCJmaWxlIjoic3BhbHRlbi5zdXBwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKjtcclxuXHRAbW9kdWxlLWxpY2Vuc2U6XHJcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcclxuXHRcdEBtaXQtbGljZW5zZVxyXG5cclxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3JcclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxyXG5cclxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5cdFx0U09GVFdBUkUuXHJcblx0QGVuZC1tb2R1bGUtbGljZW5zZVxyXG5cclxuXHRAbW9kdWxlLWNvbmZpZ3VyYXRpb246XHJcblx0XHR7XHJcblx0XHRcdFwicGFja2FnZVwiOiBcInNwYWx0ZW5cIixcclxuXHRcdFx0XCJwYXRoXCI6IFwic3BhbHRlbi9zcGFsdGVuLmpzXCIsXHJcblx0XHRcdFwiZmlsZVwiOiBcInNwYWx0ZW4uanNcIixcclxuXHRcdFx0XCJtb2R1bGVcIjogXCJzcGFsdGVuXCIsXHJcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXHJcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXHJcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcclxuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIixcclxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcclxuXHRcdFx0XSxcclxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL3NwYWx0ZW4uZ2l0XCIsXHJcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcclxuXHRcdH1cclxuXHRAZW5kLW1vZHVsZS1jb25maWd1cmF0aW9uXHJcblxyXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcclxuXHRcdFRoaXMgd2lsbCByZXR1cm4gYSBkZWZhdWx0IHBhZ2luYXRpb24gb2JqZWN0LlxyXG5cclxuXHRcdFRoZSBvYmplY3QgY29udGFpbnMsIHRoZSBzaXplLCBjb3VudCBhbmQgdGhlIGZhY3RvciBkZXRlcm1pbmFudC5cclxuXHJcblx0XHRUaGUgaW5pdGlhbCBmYWN0b3IgaXMgdGhlIHBhcnRpdGlvbiBmYWN0b3IsIHRoZSBkaWZmZXJlbmNlIHdpdGggdGhlIGZhY3RvciBkZXRlcm1pbmFudFxyXG5cdFx0XHRpcyB0aGF0LCBpbml0aWFsIGZhY3RvciBkZXRlcm1pbmVzIGhvdyB0aGUgbGlzdCB3aWxsIGJlIHBhcnRpdGlvbi5cclxuXHRcdFx0RmFjdG9yIGRldGVybWluYW50IGRldGVybWluZXMgd2hhdCBmYWN0b3IgcmVzdWx0cyB0byB0aGUgcGFydGl0aW9uIG9mIHRoZSBsaXN0LlxyXG5cclxuXHRcdFRoZSBwYXJ0aXRpb24gZmFjdG9yIGJhbGFuY2VzIGhvdyBtYW55IHdpbGwgYmUgbGlzdGVkIGFuZCBob3cgbG9uZyB0aGV5IGNhbiBiZSBwcm9jZXNzZWQuXHJcblx0XHRcdFRoaXMgd2lsbCBiZSB1c2VkIHRvIGdlbmVyYXRlIHRoZSBmYWN0b3IgZGV0ZXJtaW5hbnQuXHJcblxyXG5cdFx0RmFjdG9yIGRldGVybWluYW50IGlzIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIHBhZ2Ugc2l6ZS5cclxuXHJcblx0XHRJZiB0aGUgcGFnZSBzaXplIGlzIGdlbmVyYXRlZCBpdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBwYWdlIGNvdW50LlxyXG5cclxuXHRcdFRoZSBwYXJ0aXRpb24gZmFjdG9yIGJ5IGRlZmF1bHQgaXMgdGhlIGdvbGRlbiByYXRpbyBudW1iZXIuXHJcblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxyXG5cclxuXHRAaW5jbHVkZTpcclxuXHRcdHtcclxuXHRcdFx0XCJoYXJkZW5cIjogXCJoYXJkZW5cIixcclxuXHRcdH1cclxuXHRAZW5kLWluY2x1ZGVcclxuKi9cclxuXHJcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcclxuXHJcbmNvbnN0IHNwYWx0ZW4gPSBmdW5jdGlvbiBzcGFsdGVuKCBjb3VudCwgZmFjdG9yICl7XHJcblx0Lyo7XHJcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJjb3VudDpyZXF1aXJlZFwiOiBcIm51bWJlclwiLFxyXG5cdFx0XHRcdFwiZmFjdG9yXCI6IFwibnVtYmVyXCJcclxuXHRcdFx0fVxyXG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cclxuXHQqL1xyXG5cclxuXHRpZiggdHlwZW9mIGNvdW50ICE9IFwibnVtYmVyXCIgKXtcclxuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGNvdW50XCIgKTtcclxuXHR9XHJcblxyXG5cdGZhY3RvciA9IGZhY3RvciB8fCBzcGFsdGVuLlBBUlRJVElPTl9GQUNUT1I7XHJcblxyXG5cdGlmKCBmYWN0b3IgJiYgdHlwZW9mIGZhY3RvciAhPSBcIm51bWJlclwiICl7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBmYWN0b3JcIiApO1xyXG5cdH1cclxuXHJcblx0bGV0IGxvbmdlclNlZ21lbnQgPSBjb3VudCAvIHNwYWx0ZW4uUEFSVElUSU9OX0ZBQ1RPUjtcclxuXHJcblx0bGV0IHNob3J0ZXJTZWdtZW50ID0gY291bnQgLSBsb25nZXJTZWdtZW50O1xyXG5cclxuXHR2YXIgZmFjdG9yID0gY291bnQgLyBNYXRoLnNxcnQoIE1hdGgucG93KCBsb25nZXJTZWdtZW50LCAyICkgK1xyXG5cdFx0TWF0aC5wb3coIHNob3J0ZXJTZWdtZW50LCAyICkgKTtcclxuXHJcblx0bGV0IHBhZ2VTaXplID0gTWF0aC5mbG9vciggTWF0aC5zcXJ0KCBjb3VudCApICogZmFjdG9yICk7XHJcblxyXG5cdGxldCBwYWdlQ291bnQgPSBNYXRoLmNlaWwoIGNvdW50IC8gcGFnZVNpemUgKTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdFwic2l6ZVwiOiBwYWdlU2l6ZSxcclxuXHRcdFwiY291bnRcIjogcGFnZUNvdW50LFxyXG5cdFx0XCJmYWN0b3JcIjogZmFjdG9yXHJcblx0fTtcclxufTtcclxuXHJcbmhhcmRlbi5iaW5kKCBzcGFsdGVuIClcclxuXHQoIFwiUEFSVElUSU9OX0ZBQ1RPUlwiLCAoICggMSArIE1hdGguc3FydCggNSApICkgLyAyICkgKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc3BhbHRlbjtcclxuIl19
//# sourceMappingURL=spalten.support.js.map
