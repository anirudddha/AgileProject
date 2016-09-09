var serverAddr = "http://10.20.14.83:9002";

var insuranceApp = angular.module('insuranceApp', ['ngRoute', 'ngCookies']);


// a controller which will handle actions from the page 
function registerController($scope, $location, $http, $cookieStore){
	
	$scope.userType = $cookieStore.get('userType');
	
	
	$scope.openModal = function(modalName){
		$('#' + modalName).modal('show');
	}
	$scope.closeModal = function(modalName){
		$('#' + modalName).modal('hide');
	}
	
	$scope.firstnameToUpper = function(){
		$scope.fname = $scope.fname.toUpperCase();
	}

	$scope.lastnameToUpper = function(){
		$scope.lname = $scope.lname.toUpperCase();
	}

//  not working for email
//	$scope.emailToUpper = function(){
//		$scope.email = $scope.email.toUpperCase();
//		$scope.ifUserExists();
//	}

	$scope.addressToUpper = function(){
		$scope.address = $scope.address.toUpperCase();
	}

	$scope.stateToUpper = function(){
		$scope.state = $scope.state.toUpperCase();
	}
	
	$scope.cityToUpper = function(){
		$scope.city = $scope.city.toUpperCase();
	}
	
	$scope.usernameCheck = function(){		
		un = $scope.uname;
		var upChar;
		var len = $scope.uname.length;

		// if number or characters then only accept
		// try for space also
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
		$scope.uname = $scope.uname.toUpperCase();
		
		$scope.ifUserExists();
	}
	
	$scope.passwordLengthCheck = function(){
		if ($scope.psw.length < 8){
				$scope.registerPswErrMsg = "Password should be at least 8 characters long";
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
	
	$scope.ifUserExists = function(){
		
		var uname = $scope.uname;
		var email = $scope.email;
		
		if($scope.uname.length >0 && $scope.email.length >0)
			{
				//	fire query to server
				$http({
					method	:	'GET',
					url		:	serverAddr + '/imservices/user/check?userName=' + uname + '&email=' + email ,
					header	:	
					{
						'Content-Type' : 'application/json',
						'Access-Control-Allow-Origin' :	serverAddr  
					}
				}).then(function mySucces(response) {
					
					$scope.registerEmailUserExists = "";
					$scope.registerUnameUserExists = "";
				
					if(response.data.status == "email-fail"){
						$scope.registerEmailUserExists = "Email exists";
						return true;
					}
					if (response.data.status == "userName-fail"){
						$scope.registerUnameUserExists = "Username exists";
						return true;
					}
					
					// ask for this to sir
//					if(response.data.status == "userName-email-fail"){
//						$scope.registerEmailUserExists = "Email exists";
//						$scope.registerUnameUserExists = "Username exists";
//						return true;
//					}
				}
				, function myError(response) {
			        $scope.myWelcome = response.statusText;
				})		
	}
	
	$scope.registerUser = function(){		
		// check length of username
		if($scope.uname.length < 6){
			$scope.registerUnameErrMsg = "Username should be at least 6 characters long";
			$(Scope.uname).focus();
			return;
		}
		else
			{
				$scope.registerUnameErrMsg = "";
			}
		// if password length doesn't satisfy to 8 chars long
		if ($scope.psw.length < 8){
			$scope.registerswErrMsg = "Password should be at least 8 characters long";
			return;
		}
		else
			{
			$scope.registerswErrMsg = "";
			}
		
		
		// if password wrong dont proceed 
		if ($scope.cpsw != $scope.psw){
			$scope.registerCpswErrMsg = "Re-entered password mismatched";
			return;
		}
		else
			{
				$scope.registerCpswErrMsg = "";
			}
		//check for ifUserExists
		var flag = false;
		$http({
			method	:	'GET',
			url		:	serverAddr + '/imservices/user/check?userName=' + uname + '&email=' + email ,
			header	:	
			{
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin' :	serverAddr  
			}
		}).then(function mySucces(response) {
			
			$scope.registerEmailUserExists = "";
			$scope.registerUnameUserExists = "";
		
			if(response.data.status == "email-fail"){
				$scope.registerEmailUserExists = "Email exists";
				flag = true;
			}
			if (response.data.status == "userName-fail"){
				$scope.registerUnameUserExists = "Username exists";
				flag = true;
			}
			
			// ask for this to sir
//			if(response.data.status == "userName-email-fail"){
//				$scope.registerEmailUserExists = "Email exists";
//				$scope.registerUnameUserExists = "Username exists";
//				flag = true;
//			}
		}
		, function myError(response) {
	        $scope.myWelcome = response.statusText;
		})		
		
		
		if (flag == true)
			{
				//user exist
				flag = false;
				return;
			}
		
		// fire POST request
		$http({
			
			method	:	'POST',
			url		:	serverAddr + '/imservices/user',
			header	:	
				{
					'Content-Type' : 'application/json',
					'Access-Control-Allow-Origin' :	serverAddr
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
		});
	}
};

}


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
insuranceApp.controller('registerController',registerController );



