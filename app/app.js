(function() {
	"use strict";

	angular
		.module("app", ["ngSanitize", "feature"])
		.controller("Default", Default)
		.filter("labelCase", labelCase)
		.filter("skip", skip)
		.filter("take", take);

	function Default(productData) {
		var $ctrl = this;
		$ctrl.products = productData.products;

		$ctrl.getExpiryDate = function(days) {
			let now = new Date();
			return now.setDate(now.getDate() + days);
		}

		$ctrl.myCustomSorter = function(item) {
			return item.expiry < 5 ? 0 : item.price;
		}

		$ctrl.selectItem = function(item) {
			return item.category === "Fish" || item.name === "Beer";
		}


		// $ctrl.htmlSnippet = 
		// 	'Pretty text with some links:\n'+
		// 	'http://angularjs.org/,\n'+
		// 	'mailto:us@somewhere.org,\n'+
		// 	'another@somewhere.org,\n'+
		// 	'and one more: ftp://127.0.0.1/.';
	}

	function labelCase() {
		return function(input, reverse) {
			if (angular.isString(input)) {
				return reverse 
					? (angular.lowercase(input[0]) + angular.uppercase(input.substring(1)))
					: (angular.uppercase(input[0]) + angular.lowercase(input.substring(1)))
			}
			else {
				return input;
			}
		};
	}

	function skip() {
		return function(input, skipCount) {
			if (angular.isArray(input)) {
				return input.slice(skipCount);
			}
			else {
				return input;
			}
		}
	}

	// function take($filter) {
	// 	return function(input, skipCount, takeCount) {
	// 		let skipTmp = $filter("skip")(input, skipCount);
	// 		return $filter("limitTo")(skipTmp, takeCount);
	// 	};
	// }

	function take(skipFilter, limitToFilter) {
		return function(input, skipCount, takeCount) {
			let skipTmp = skipFilter(input, skipCount);
			return limitToFilter(skipTmp, takeCount);
		};
	}

	angular.element(document).ready(() => {
		angular.bootstrap(document, ["app"]);
	});

})();

















