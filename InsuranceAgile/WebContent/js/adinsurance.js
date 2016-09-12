var serverAddr = "http://10.20.14.83:9002";

var insuranceApp = angular.module('AD_insuranceApp', ['ngRoute', 'ngCookies']);
insuranceApp.directive('ngNav', function() {
	return {
		restrict: 'E',//E = element, A = attribute, C = class, M = comment
	
		templateUrl: 'navbar.html',
		controller : 'registerController',
		link: function(scope, iElement, iAttrs) {

		}
	}
});

// a controller which will handle actions from the page 
function registerController($scope, $location, $http, $cookieStore){
	
	$scope.homepageBGImage = true;
	$scope.allProducts = [];
	$scope.allAgents   = [];
	console.log('reached controller');
	
	
//	$scope.hide = function(){
//		if ($scope.homepageBGImage){
//			$scope.homepageBGImage = false;
//		}
//		else
//			{
//			$scope.homepageBGImage = true;
//		}
//	}
	
	
	// get all products 
		$scope.getAllProducts = function(){		
			$http({
				method : 'GET',
					url : serverAddr+ '/imservices/product',
				headers : {
							'Content-Type' : 'application/json',
							'Access-Control-Allow-Origin': serverAddr,
		
						}
			}).then(function successCallback(response) {
					$scope.allProducts = response.data;
					$scope.homepageBGImage = false;
					$scope.productsDisplayDiv=true;
					$scope.agentsDisplayDiv =false;
					
	        }, function errorCallback(response) {
	        		alert("Server Error. Try After Some time: " + response);
	
	        });
		
		}
		// view specific product
		$scope.viewProductDetails = function(prod){
			//on next view/modal
			console.log(prod);
		}
		
		
		//gotoHome and display the background image
		$scope.gotoHome = function(){
			$scope.homepageBGImage = true;
			$scope.productsDisplayDiv = false;
			$scope.agentsDisplayDiv = false;
			
			//if more ngShow then make them false here
		}
		
		

		// get all agents 
		$scope.getAllAgents = function(){		
			$http({
				method : 'GET',
					url : serverAddr+ '/imservices/agent',
				headers : {
							'Content-Type' : 'application/json',
							'Access-Control-Allow-Origin': serverAddr,
		
						}
			}).then(function successCallback(response) {
					$scope.allAgents = response.data;
					$scope.homepageBGImage = false;
					$scope.agentsDisplayDiv = true;
					$scope.productsDisplayDiv=false;
					
					
	        }, function errorCallback(response) {
	        		alert("Server Error. Try After Some time: " + response);
	
	        });		
		}
		// view specific product
		$scope.viewAgentDetails = function(agent){
			//on next view/modal
			console.log(agent);
		}


}
//controller ends here

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



