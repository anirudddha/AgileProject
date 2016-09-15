var myModule = angular.module('AD_insuranceApp', ['ngRoute']);

myModule.directive('ngNav', function() {
	return {
		restrict: 'E',//E = element, A = attribute, C = class, M = comment
	
		templateUrl: 'firstpage.html',
		link: function(scope, iElement, iAttrs) {

		}
	}
});