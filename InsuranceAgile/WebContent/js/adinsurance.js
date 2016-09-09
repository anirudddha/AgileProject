var serverAddr = "http://10.20.14.83:9002";

var insuranceApp = angular.module('AD_insuranceApp', ['ngRoute', 'ngCookies']);


// a controller which will handle actions from the page 
function registerController($scope, $location, $http, $cookieStore){
	
	console.log('reached controller');
	$scope.hide = function(){
		if ($scope.homepageBGImage){
			$scope.homepageBGImage = false;
		}
		else
			{
			$scope.homepageBGImage = true;
		}
	}
}


//give routing to pages
insuranceApp.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		controller	:	'registerController',
		templateUrl	:	'firstpage.html'
	})
});

//add controllers
insuranceApp.controller('registerController',registerController );



