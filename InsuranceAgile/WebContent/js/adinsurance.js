var serverAddr = "http://10.20.14.83:9002";

var insuranceApp = angular.module('insuranceApp', ['ngRoute']);


// a controller which will handle actions from the page 
function registerController($scope, $location, $http){
	
	$scope.openModal = function(modalName){
		$('#' + modalName).modal('show');
	}
	$scope.closeModal = function(modalName){
		$('#' + modalName).modal('hide');
	}
	
	$scope.firstnameToUpper = function(){
		
	}

	$scope.firstnameToUpper = function(){
		
	}

	$scope.firstnameToUpper = function(){
		
	}

	$scope.firstnameToUpper = function(){
		
	}

	$scope.firstnameToUpper = function(){
		
	}

	$scope.usernameCheck = function(){		
		un = $scope.uname;
		var upChar;
		var len = $scope.uname.length;

		//if number or characters then only accept
		//try for space also
		if( ( (un.charCodeAt(len - 1) >= 65 ) && (un.charCodeAt(len - 1) <= 90 ) ||
			(un.charCodeAt(len - 1) >= 97 ) && (un.charCodeAt(len - 1) <= 122 )||
			(un.charCodeAt(len - 1) >= 48 ) && (un.charCodeAt(len - 1) <= 57) ) ){  
				//accepted
		}
		else
			{
				$scope.uname = un.slice(0, un.length - 1);
				$scope.registerUnameErrMsg = "Username cannot contain special characters and white space";
			}
		
		un = $scope.uname;
		len = $scope.uname.length;
		if ( len < 6){
				$scope.registerUnameErrMsg = "Username should be at least 6 characters long";
			}
		else
			{
				$scope.registerUnameErrMsg = "";
			}
		
		un = $scope.uname;
		len = $scope.uname.length;
		
		//convert uname to uppercase
		if(un.charCodeAt(len - 1) >= 97 && un.charCodeAt(len - 1) <=  122 ){
			upChar = String.fromCharCode(un.charCodeAt(len- 1) - 32) ;
			un = un.slice(0, len - 1);
			un = un.concat(upChar);
			$scope.uname = un;
		}
	}
	
	$scope.passwordLengthCheck = function(){
		if ($scope.psw.length < 8){
				$scope.registerPswErrMsg = "password should be at least 8 characters long";
			}
		else
			{
				$scope.registerPswErrMsg = "";
			}
	}
	
	$scope.passwordMatch = function(){
		if ($scope.cpsw != $scope.psw){
			$scope.registerCpswErrMsg = "Re-entered password mismatched";
		}
		else{
			$scope.registerCpswErrMsg = "";
		}
	}
	
	$scope.registerUser = function(){
		
		// check length of username
		if($scope.uname.length < 6){
			$scope.registerUnameErrMsg = "Username should be at least 6 characters long";
			$(Scope.uname).focus();
			return;
		}
		
		// if password wrong dont proceed 
		if ($scope.cpsw != $scope.psw){
			$scope.registerCpswErrMsg = "Re-entered password mismatched";
			return;
		}
		
		
		
		// fire POST request
		$http({
			
			method	:	'POST',
			url		:	serverAddr + '/imservices/user',
			header	:	
				{
					'Content-Type' : 'application/json',
					'Access-Control-Allow-Origin' :	serverAddr + '/imservices/user'
				},
			data : 
				{
					firstName	:	$scope.fname,
					lastName	:	$scope.lname,
					address		:	$scope.address,
					state		:	$scope.state,
					city		:	$scope.city,
					contactNo	:	$scope.contact,
					email		:	$scope.email,
					userName	:	$scope.uname,
					password	:	$scope.psw,
					userType	:	"DIRECR CUSTOMER"
				}
		}).then(function successCallback(response){
			alert ("Registered successfully");
			
			// NOW REDIRECT TO LOGIN PAGE
			
			
		}, 
		
		function errorCallback(response){
				alert("Error : \n" + response.data);	
		})	
	}
};




//give routing to pages
insuranceApp.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		controller	:	'registerController',
		templateUrl	:	'registerUser.html'
	})
	.when('/registerUser', {
			controller	:	'registerController',
			templateUrl	:	'registerUser.html'
		})
});

//add controllers
insuranceApp.controller('registerController',registerController);



