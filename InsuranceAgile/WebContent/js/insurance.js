var myMod = angular.module('insuranceApp', ['ngRoute','ngCookies']);

// MOhit's code starts here'


// Mohit's code ends here


// Arushi's code starts here'
myMod.service('iService', function($http,$cookieStore){
var userType;

this.setUserType=function(type,$rootScope,$scope)
    {
    	$cookieStore.put('userType',type);
    };

	
	//return factobj;

	this.login = function (uname, pass, $http, $scope) 
		{
	   
			$http({
					method : 'GET',
						url : 'http://10.20.14.83:9002/imservices/login?userName='+uname+'&password='+pass,
					headers : {
								'Content-Type' : 'application/json',
								'Access-Control-Allow-Origin': 'http://10.20.14.83:9002',
			
											}
				}).then(function successCallback(response) {
					var data = response.data;
					if(response.data.id!=null)
						{
					console.log("The USERID is"+data.id);
					alert('successful login usertype '+$cookieStore.get("userType"));
					$cookieStore.put('auth-token',response.data['auth-token']);
                    $cookieStore.put('uname',response.data.userName);
						}
					else
						{
						//alert('invalid username and password!!!');
						$scope.passwordErr = "invalid username or password!!!";
						return;
						}
					
		        }, function errorCallback(response) {
		        		alert("Server Error. Try After Some time: " + response);

													});
	
	
	
	
		}});




// Arushi's code ends here

// Aniruddha's code starts here'


// Aniruddha's code ends here

var controllers = {};
var IController = function($scope,$rootScope,$http,$cookieStore,iService) {
	
	$scope.login_user = function(){
		$scope.unameErr = "";
		$scope.passwordErr = "";
		
		if($scope.uname.length == 0){
			$scope.unameErr = "Enter username";
			return;
		}
		
		if($scope.pass.length == 0){
			$scope.passwordErr = "Enter password";
			return;
		}

		$rootScope.isLogged =iService.login($scope.uname ,$scope.pass , $http, $scope);
        
        }
	
	$scope.setUserType = function(type){
		
		$scope.userType=iService.setUserType(type);
//		
//		
	}
	$rootScope.userType=$cookieStore.get("userType");
	$scope.show=function()
	{
		$rootScope.userType=$cookieStore.get("userType");
		alert($rootScope.userType);
	}
		
	
	
	
};


controllers.IController = IController;
myMod.controller(controllers);
myMod.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller: 'IController',
		templateUrl: 'index.html'
	})
	.when('/loginAgent', {
		controller: 'IController',
		templateUrl: 'login.html'
	})
	.when('/loginDC', {
		controller: 'IController',
		templateUrl: 'login.html'
	})
	.otherwise({redirectTo: '/'})
});