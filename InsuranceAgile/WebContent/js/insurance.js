
var myMod = angular.module('insuranceApp', ['ngRoute','ngCookies']);
var serverAddr = "http://10.20.14.83:9002";

myMod.directive('ngNav', function() {
	return {
		restrict: 'E',//E = element, A = attribute, C = class, M = comment	
		templateUrl: 'navbar.html',
		controller : 'IController',
		link: function(scope, iElement, iAttrs) {
		}
	}
});

// MOhit's code starts here'


// Mohit's code ends here


// Arushi's code starts here'
	
var controllers = {};
		
var IController = function($scope,$rootScope,$http,$cookieStore, $location) {
			
			$scope.userExists = false;
			
			$scope.ifLoggedIn = function(){
				if($cookieStore.get('auth-token')==null )
				{
					//$location.path('/');
				}
				if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="DIRECT CUSTOMER")
					{
						$location.path('/DCustomer');
					}
				if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="AGENT")
					{
						// go to Agent
						$location.path('/Agent');
					}
				if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="MANAGED CUSTOMER")
				{
					// go to Agent
					$location.path('/MCustomer');
				}
				if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="ADMIN")
				{
					// go to Agent
					$location.path('/admin');
				}
			
			}
			
			$scope.ifLoggedIn();

			
			$scope.openModal = function(modalName){
//				$cookieStore.put('userType', uType);
//				if (uType != 'null'){
//					$scope.userType = $cookieStore.get('userType');
//				}
				$('#' + modalName).modal('show');
//				document.getElementById("lusername").focus();
			}
					
			$scope.closeModal = function(modalName){
				if(modalName=="loginUser"){
					$scope.luname="";
					$scope.lpass="";
				}
				if(modalName=="loginAgent"){
					$scope.luname="";
					$scope.lpass="";
				}
				if(modalName=="registerUser"){
					$scope.fname="";
					$scope.lname="";
					$scope.address="";
					$scope.city="";
					$scope.contact="";
					$scope.email="";
					$scope.uname="";
					$scope.psw="";
					$scope.cpsw="";
				}
				if(modalName=="registerAgent"){
					$scope.age="";
					$scope.qualification="";
					$scope.occupation="";
					$scope.rewards="";
					$scope.experience="";
					$scope.status="";
							
				}
				$('#' + modalName).modal('hide');
			}
					
			$( "#lusername" )
			  .focusout(function() {
				$scope.unameErr = "";
				$scope.passwordErr = "";
					
					if($scope.luname == null){
						$scope.unameErr = "Enter username";
						return;
					}
					
					if($scope.luname.length == 0){
						$scope.unameErr = "Enter username";
						return;
					}
					
					
			  })				
			$scope.lunameChange = function(){
//				if($scope.luname.length > 0){
//					$scope.unameErr = "";
//				}
			}
			 
			$scope.login_user = function(){
						$scope.unameErr = "";
						$scope.passwordErr = "";
						
						if($scope.luname.length == 0){
							$scope.unameErr = "Enter username";
							return;
						}
						
						if($scope.lpass.length == 0){
							$scope.passwordErr = "Enter password";
							return;
						}								
									// check if account is present or not
									$http({
										method : 'GET',
											url : 'http://10.20.14.83:9002/imservices/login?userName='+$scope.luname+'&password='+$scope.lpass,
										headers : {
													'Content-Type' : 'application/json',
													'Access-Control-Allow-Origin': 'http://10.20.14.83:9002'
												}
									})
									.then(function successCallback(response) {
										var data = response.data;
										if(response.data.id!=null)
											{
												console.log("The USERID is " + data.id);												
												
		//										if($scope.userType == "AGENT"){									
		//											$location.path('/agent/'+$cookieStore.get("uname")+"/"+$cookieStore.get("userType")+"/"+$cookieStore.get("auth-token"));
		//											console.log("/agent/"+$cookieStore.get("uname")+"/"+$cookieStore.get("userType")+"/"+$cookieStore.get("auth-token"));
		//										}
		//										else
												if ( data.userName == "ADMIN"){
														$scope.userType = "ADMIN";
														$cookieStore.put('auth-token', response.data['id']);
									                    $cookieStore.put('uname', response.data.userName);
									                    $cookieStore.put('userType', "ADMIN");
									                    $scope.closeModal('loginUser');
//									    		    	$scope.showMyAlertDialog("Success!", "Loading details...");
														$location.path('/admin');
														}
												else
													{
														$scope.userType = "DIRECT CUSTOMER";
														$cookieStore.put('auth-token',response.data['id']);
														console.log(response.data['id']);
									                    $cookieStore.put('uname',response.data.userName);
									                    $cookieStore.put('userType', "DIRECT CUSTOMER");
									                    $scope.closeModal('loginUser');
//									                    $scope.showMyAlertDialog("Success!", "Loading details.");
														$location.path('/DCustomer');
													}
		//										else{
		//											$location.path('/mCustomer/'+$cookieStore.get("uname"));
		//											console.log("/mCustomer/"+$cookieStore.get("uname"))
		//										}
											}
										else
											{
											//alert('invalid username and password!!!');
												$scope.passwordErr = "invalid username or password!!!";
												//return;
											}
										
							        }, function errorCallback(response) {
							        		$cookieStore.put('uname',null);
							        		$cookieStore.put('userType',null);
							        		alert("Server Error. Try After Some time: " + response);
								});
								
//						$scope.closeModal('loginUser');
				    }
					
					$scope.lunameToUpper = function(){
						$scope.luname = $scope.luname.toUpperCase();
					}
					
					$scope.firstnameToUpper = function(){
						$scope.fname = $scope.fname.toUpperCase();
					}
				
					$scope.lastnameToUpper = function(){
						$scope.lname = $scope.lname.toUpperCase();
					}
				
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
					
					$scope.agentnameCheck = function(){		
						un = $scope.uname;

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
						
						$scope.ifAgentExists();
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
					
					$scope.registerUser = function(){		
						// check length of username
						$scope.ifUserExists();

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
						//$scope.userExists = false;
							
						if($scope.fname.length == 0 || $scope.lname.length == 0 || $scope.address.length == 0 || $scope.state.length == 0 || 
								$scope.city.length == 0 || $scope.contact.length == 0 || $scope.email.length == 0 || $scope.uname.length == 0 || 
								$scope.psw.length == 0 || $scope.cpsw.length == 0 )
							{
								return;
							}
						
						if ($scope.userExists == true)
							{
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
							//alert ("Registered successfully");
							$scope.showMyAlertDialog("Success!", "Registered successfully");
							$scope.closeModal('registerUser');
							// NOW REDIRECT TO LOGIN PAGE
						}, 
						
						function errorCallback(response){
								alert("Error : \n" + response.data);	
						});
					};

					
					$scope.ifUserExists = function(){
						
						var uname = $scope.uname;
						var email = $scope.email;
						
						
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
										$scope.userExists = true;
									}
									else
										if (response.data.status == "userName-fail"){
										$scope.registerUnameUserExists = "Username exists";
										$scope.userExists = true;
									}
										else
											{
												$scope.userExists = false;
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

				};
				
				$scope.ifAgentExists = function(){
					
					var uname = $scope.uname;
					var email = $scope.email;
					
					
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
							
								if (response.data.status == "userName-fail"){
									
									$scope.userExists = true;
								}
								else
									{
										$scope.registerUnameUserExists = "Username does not exist";
										$scope.userExists = false;
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

			};
				
				
			
			
//===========================================agent registration============================
			$scope.checkAge=function(){
				if ($scope.age < 20 || $scope.age>60){
					$scope.registerAgeErrMsg = "not a valid age";
					return;
				}
				else
					{
						$scope.registerAgeErrMsg = "";
			
					}
			}
			
			$scope.occupationToUpper=function(){
				$scope.occupation=$scope.occupation.toUpperCase();
			}
			
			$scope.qualificationToUpper=function(){
				$scope.qualification=$scope.qualification.toUpperCase();
			}
			
			$scope.rewardsToUpper=function(){
				$scope.rewards=$scope.rewards.toUpperCase();
			}
						
			$scope.registerAgent = function(){	
				
				if($scope.uname.length < 6){
					$scope.registerUnameErrMsg = "Username should be at least 6 characters long";
					$scope.uname.focus();
					return;
				}
				else
					{
						$scope.registerUnameErrMsg = "";
					}
				
				if($scope.experience==null)
					{
						$scope.experienceErrMsg="enter experience";
						return;
					}
				
				if($scope.experience > 35 || $scope.experience<=-1)
					{
						$scope.experienceErrMsg="enter valid number!!!";
						return;
					}
				else
					{
						$scope.experienceErrMsg="";
					}
				
				if($scope.qualification==null)
					{
						registerQualificationErrMsg="Please select your qualfication";
						return;
					}
				if($scope.occupation==null)
					{
						registerOccupationErrMsg="Enter your present occupation";
						return;
					}

				if($scope.email==null)
					{
						$scope.experienceErrMsg="enter your email-id first!!!";
						return;
					}


				if($scope.contact==null)
					{
						$scope.experienceErrMsg="enter your contact details!";
						return;
					}
				
				
				// fire POST request
				$http({
					
					method	:	'POST',
					url		:	serverAddr + '/imservices/agent',
					header	:	
						{
							'Content-Type' : 'application/json',
							'Access-Control-Allow-Origin' :	serverAddr
						},
					data : 
						{
							userName				:	$scope.uname,
							age						:	$scope.age,
							lastQualification		:	$scope.qualification,
							presentOccupation		:	$scope.occupation,
							rewards					:	$scope.rewards,
							workExperience			:	$scope.experience,
							phone					: 	$scope.contact,
							email					: 	$scope.email								
						}
				}).then(function successCallback(response){
					var data=response.data;
					if(response.data.userName!=null){
//					   alert("successfully register!!!");
						$scope.showMyAlertDialog("Success", "Agent registered");
					   $scope.closeModal('registerAgent');
					   
					   	
						
						
					}
					else{
						alert("error in registration!!!");
					}
				
				}, 
				
				function errorCallback(response){
						alert("Error : \n" + response.data);	
				});
			}
		//agent registration ends here
			
		//=================================create ploicy====================================

		$scope.homepageBGImage = true;
		$scope.allProducts = [];
		$scope.allAgents   = [];
		console.log('reached controller');
		
		
//		$scope.hide = function(){
//			if ($scope.homepageBGImage){
//				$scope.homepageBGImage = false;
//			}
//			else
//				{
//				$scope.homepageBGImage = true;
//			}
//		}
		
		
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
						$scope.agentDetails = false;
						$scope.productDetails = false;
						
		        }, function errorCallback(response) {
		        		alert("Server Error. Try After Some time: " + response);
		        });
				
				$scope.searchProductName = "";
				$scope.searchAgentUName = "";
			
			}
			
			// view specific product
			$scope.viewProductDetails = function(prd){
				//on next view/modal
				//console.log(agent);
				$scope.detailProduct = prd;
				$scope.agentDetails = false;
				$scope.productDetails = true;
				
			}

			$scope.hideProductDetails = function(){
				$scope.agentDetails = false;
				$scope.productDetails = false;
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
						$scope.agentDetails = false;
						$scope.productDetails = false;
						
		        }, function errorCallback(response) {
		        		alert("Server Error. Try After Some time: " + response);
		        });		
				$scope.searchProductName = "";
				$scope.searchAgentUName = "";
			}
			
			// view specific agent
			$scope.viewAgentDetails = function(ag){
				//on next view/modal
				//console.log(agent);
				$scope.detailAgent = ag;
				$scope.agentDetails = true;
				$scope.productDetails = false;
			}

			$scope.hideAgentDetails = function(){
				$scope.agentDetails = false;
				$scope.productDetails = false;
			}
			
			$scope.showMyAlertDialog = function (hdr, msg){
				$scope.header = hdr;
				$scope.message = msg;
				
				$('#myAlertDialog').modal('show');
				$(function() {
				    setTimeout(function() {
				        $("#myAlertDialog").modal('hide')
				    }, 2500);
				});
			}
			
			$scope.emptyErrMsg = function(){
				$scope.passwordErr = "";
			}
};
				
				

//Arushi's code ends here


//Aniruddha's code starts here'

var dCustomerController = function($scope, $rootScope, $http, $cookieStore, $location) {
	console.log("Reached dCustomerController");
	
	//check if userIsLoggedIn
	$scope.ifLoggedIn = function(){
		
		if($cookieStore.get('auth-token')==null )
			{
				$location.path('/');
			}
		if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="DIRECT CUSTOMER")
			{
				$scope.auth_token = $cookieStore.get('auth-token');
				$scope.uname = $cookieStore.get('uname');
				$scope.userType = $cookieStore.get('userType');
			}
		if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="AGENT")
			{
				// go to Agent
				$location.path('/Agent');
			}
		if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="MANAGED CUSTOMER")
		{
			// go to Agent
			$location.path('/MCustomer');
		}
		if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="ADMIN")
		{
			// go to Agent
			$location.path('/admin');
		}
	}
	$scope.ifLoggedIn();

	
	
	$scope.getAllPolicies = function(){
		  $http({
				method : 'GET',
					url : serverAddr+ '/imservices/product/',
				headers : {
							'Content-Type' : 'application/json',
							'Access-Control-Allow-Origin': serverAddr,
						}
			})
			.then(function successCallback(response) {
					$scope.allPolicies = response.data;
					console.log($scope.myPolicies);
			
			}, function errorCallback(response) {
	      		alert("Server Error. Try After Some time: " + response);
			});
}				
	$scope.showPurchasePolicy = function(){
				$scope.getAllPolicies();
				$scope.hideAllDivs();
				$scope.purchasePolicy = true;				
//				$scope.purchasePolicyName.selectedIndex=1;  //doesnt work
			}
	
//   navigation bar functionality
			$scope.buyPolicy=function(){
				if($scope.purchasePolicyName == null || $scope.purchasePolicyName == "" || $scope.purchasePolicyName == "--Select policy--")
					{
						//give error message
						return;
					}
				
				policyDocuments=$scope.policyDocument1+$scope.policyDocument2+$scope.policyDocument3;
				
				$http({
					
					method	:	'POST',
					url		:	serverAddr + '/imservices/policy',
					headers	:	
						{
							'Content-Type' : 'application/json',
							'Access-Control-Allow-Origin' :	serverAddr,
						    '_id': $cookieStore.get('auth-token') 
						},
					
					data : 
						{
							userName			:	$scope.uname,
							productName			:	$scope.purchasePolicyName,
							annualIncome		:	$scope.purchasePolicyAnnualIncome,
							employement			:	$scope.purchasePolicyEmployment
						}
						
				})
				
				.then(function successCallback(response){
					var data=response.data;
					console.log(data);
					
					if(data.id!=null){
						//alert ("Your policy is created. Wait for its appoval. We will contact soon!");
						$scope.showMyAlertDialog("Success!", "Policy purchased.");
						//empty the fields
						$scope.purchasePolicyName = "";
						$scope.purchasePolicyAnnualIncome = null;
						$scope.purchasePolicyEmployment = null;
						$scope.policyDocument1 = false;
						$scope.policyDocument2 = false;
						$scope.policyDocument3 = false;
					}
					else{
						alert("you have entered invalid data!!");
					}
					// NOW REDIRECT TO LOGIN PAGE
				}, 
				
				function errorCallback(response){
						alert("Error : \n" + response.data);	
				});
	}
	
	$scope.getMyPolicies = function(){
		$http({
			method : 'GET',
			url : serverAddr+ '/imservices/policy/' + $scope.uname,
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': serverAddr,
				}
			})
			.then(function successCallback(response) {
				$scope.myPolicies = response.data;
				$scope.hideAllDivs();
				$scope.myPoliciesDiv = true;
				console.log($scope.myPolicies);
			}, function errorCallback(response) {
			 		alert("Server Error. Try After Some time: " + response);
			});
	}		

	$scope.viewPolicyDetails = function(policy){
		$scope.detailPolicy = policy;
		$scope.hideAllDivs();
		$scope.myPoliciesDiv = true;
		$scope.detailsPolicyDiv = true;
	}
		  
	$scope.hidePolicyDetails = function(){
		$scope.detailsPolicyDiv = false;
	}		
			
	$scope.getMyClaims = function(){
		var url = 'http://10.20.14.83:9002/imservices/claim?userName=' + $scope.uname;
		$http.get(url).success(function(data, status) {
			$scope.myClaims = data;
			$scope.hideAllDivs();
			$scope.myClaimsDiv = true;
		});
	}
	
	$scope.viewClaimDetails = function(clm){
		$scope.detailClaim = clm;
		$scope.hideAllDivs();
		$scope.myClaimsDiv =true;
		$scope.detailsClaimDiv = true;
	}
	
	$scope.hideClaimDetails = function(){
		$scope.detailsClaimDiv = false;
	}
	
	$scope.getPremium = function () 
	{
		$http({
			method : 'GET',
			 url :
			'http://10.20.14.83:9002/imservices/premium/calculate?userName='+ $scope.uname,
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9002',

			}
			}).then(function successCallback(response) {
				 $scope.totalMonthlyPremium = response.data;
				 $scope.hideAllDivs();
				 $scope.totalPremium = true;
				console.log("The premium is  "+data);
			}, function errorCallback(response) {
				alert("Server Error. Try After Some time: " + response);
		});

	}
	
	$scope.showSubmitClaimDiv = function(){
		
		$scope.hideAllDivs();
		$http({
			method : 'GET',
				url : serverAddr+ '/imservices/product',
			headers : {
						'Content-Type' : 'application/json',
						'Access-Control-Allow-Origin': serverAddr,
	
					}
		}).then(function successCallback(response) {
				$scope.allProducts = response.data;
		})
		$scope.submitClaimDiv = true;
	}
	

	$scope.claimSubmit=function(){
	    
	     claimAmount = $scope.claimAmount;
	     claimDocuments=$scope.claimDocument1+$scope.claimDocument2+$scope.claimDocument3;
	     policyName=$scope.policyName;
	     policyNumber=$scope.policyNumber;
	         
	     $http({
			   method : 'POST',
			   url : 'http://10.20.14.83:9002/imservices/claim',
			   headers : {
			    'Content-Type' : 'application/json',
			    'Access-Control-Allow-Origin': 'http://10.20.14.83:9002'
			   },
			   data : {
			        	claimAmount		:	claimAmount,
			        	claimDocuments	:	claimDocuments,
			        	claimType		:	'Insurance',
			        	policyName		:	policyName,
			        	claimStatus		:	"pending",
			        approveClaimAmount	:	0,
				       	userName		:	$scope.uname,
				       	dateOfClaim		:	new Date(),
				       	policyNumber	:	policyNumber
			   }
			      }).then(function successCallback(response) {
			    	  	var data = response.data;
	   
			    	  	if((response.data.id!= null)) {
	    
			    	  		//alert("successfully submitted");
			    	  		$scope.showMyAlertDialog("Success!", "Claim submitted.");
			    	  		$scope.claimAmount = null;
			    	  		$scope.policyName = null;
			    	  		$scope.policyNumber = null;
			    	  		$scope.claimDocument1 = false;
			    	  		$scope.claimDocument2 = false;
			    	  		$scope.claimDocument3 = false;
			    	  	} 
	   
			    	  	else{
			    	  		alert("Unsuccessfull");
			    	  	}
			      }, function errorCallback(response) {
			    	  alert("Server Error. Try After Some time: " + response);
			      });
	          
	 }

			
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
				$scope.hideAllDivs();
				$scope.productsDisplayDiv=true;
				
        }, function errorCallback(response) {
        		alert("Server Error. Try After Some time: " + response);
        });
		
		$scope.searchProductName = "";
		$scope.searchAgentUName = "";
	
	}
	
	// view specific product
	$scope.viewProductDetails = function(prd){
		$scope.detailProduct = prd;
		$scope.productDetails = true;
	}

	$scope.hideProductDetails = function(){
		$scope.productDetails = false;
	}
	
	//gotoHome and display the background image
	$scope.gotoHome = function(){
		$scope.hideAllDivs();
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
				$scope.hideAllDivs();
				$scope.agentsDisplayDiv = true;
				
				
        }, function errorCallback(response) {
        		alert("Server Error. Try After Some time: " + response);
        });		
		$scope.searchProductName = "";
		$scope.searchAgentUName = "";
	}
	
	// view specific agent
	$scope.viewAgentDetails = function(ag){
		$scope.detailAgent = ag;
		$scope.agentDetails = true;
	}

	$scope.hideAgentDetails = function(){
		$scope.agentDetails = false;
	}
	
	
	$scope.hideAllDivs= function(){
		$scope.productsDisplayDiv	=	false;
		$scope.agentsDisplayDiv 	=	false;
		$scope.agentDetails 		= 	false;
		$scope.productDetails 		=	false;
		$scope.purchasePolicy 		= 	false;
		$scope.myClaimsDiv 			= 	false;
		$scope.totalPremium 		= 	false;
		$scope.myPoliciesDiv 		= 	false;
		$scope.detailsPolicyDiv 	= 	false;
		$scope.detailsClaimDiv 		= 	false;
		$scope.submitClaimDiv 		= 	false;
	}
	
	$scope.logout = function(){
		$cookieStore.put('auth-token', null);
		$cookieStore.put('userType', null);
		$cookieStore.put('uname', null);
		$location.path('/');
	}
	
	
	$scope.showMyAlertDialog = function (hdr, msg){
		$scope.header = hdr;
		$scope.message = msg;
		
		$('#myAlertDialog').modal('show');
		$(function() {
		    setTimeout(function() {
		        $("#myAlertDialog").modal('hide')
		    }, 2500);
		});
	}
};

//Aniruddha's code ends here



var adminController = function($scope, $rootScope, $http, $cookieStore, $location){
	console.log("reached in adminController");
	
	$scope.ifLoggedIn = function(){
		if($cookieStore.get('auth-token')==null )
			{
				$location.path('/');
			}
		if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="DIRECT CUSTOMER")
			{
				$scope.auth_token = $cookieStore.get('auth-token');
				$scope.uname = $cookieStore.get('uname');
				$scope.userType = $cookieStore.get('userType');
			}
		if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="AGENT")
			{
				// go to Agent
				$location.path('/Agent');
			}
		if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="MANAGED CUSTOMER")
		{
			// go to Agent
			$location.path('/MCustomer');
		}
		if($cookieStore.get('auth-token')!=null && $cookieStore.get('userType')=="ADMIN")
		{
			// go to Agent
			$scope.auth_token = $cookieStore.get('auth-token');
			$scope.uname = $cookieStore.get('uname');
			$scope.userType = $cookieStore.get('userType');
			$location.path('/admin');
		}
	}
	$scope.ifLoggedIn();
	
	
	
	// admin sidenavbar functionalities

	$scope.getPendingpolicy = function(){
		$http({
	        method : 'GET',
	        url : 'http://10.20.14.83:9002//imservices/policy/pending',
	        headers : {
	              'Content-Type' : 'application/json',
	              'Access-Control-Allow-Origin': serverAddr
	        }}).then(function successCallback(response) {
	        	$scope.pendingPolicies = response.data;
	        	$scope.hideAllDivs();
	        	$scope.pendingPoliciesDiv = true;
	        });             
	};
	
	$scope.approvepolicyStatus=function(no){
		  
		console.log(no);
		  
		        var claimstatus="approved";
		        
		    $http({
		        'method': 'PUT',
		        url:'http://10.20.14.83:9002/imservices/policy?policyNumber=' +no +'&status='+claimstatus,
		       
		        data : {
		        	id:no ,
		        	status:claimstatus
		     
		     
		       }
		    })
		    .then(function successCallback(response) {
			    $scope.getPendingpolicy(); 
			    $scope.showMyAlertDialog("Success!", "Policy approved.");
		    }, function errorCallback(response) {
		    alert("Server Error. Try After Some time: " + response);

		  });


		  
		  
	}
	
	$scope.rejectpolicyStatus=function(no){
		  
		console.log(no);
		  
		        var claimstatus="rejected";
		        
		    $http({
		        'method': 'PUT',
		        url:'http://10.20.14.83:9002/imservices/policy?policyNumber=' +no +'&status='+claimstatus,
		       
		        data : {
		        	id:no ,
		        	status:claimstatus
		     
		     
		       }
		    })
		    .then(function successCallback(response) {
			    $scope.getPendingpolicy();
			    $scope.showMyAlertDialog("Success!", "Policy rejected.");
		    }, function errorCallback(response) {
		    	alert("Server Error. Try After Some time: " + response);

		  });

		 }
	

	
	$scope.getPendingClaims= function(){
		//console.log("hello");
		$http({
	        method : 'GET',
	        url : 'http://10.20.14.83:9002/imservices/claim/pending',
	        headers : {
	              'Content-Type' : 'application/json',
	              'Access-Control-Allow-Origin': 'http://10.20.14.83:9001/'
	        }}).
	        then(function successCallback(response) {
	        	$scope.pendingClaims = response.data;
	        	$scope.hideAllDivs();
	        	$scope.pendingClaimsDiv = true;
	        });             
	}
	
	$scope.rejectClaimStatus=function(id1){
		//console.log(id1);
		 var claimstatus="rejected";
		 $http({
			 'method': 'PUT',
			 url:'http://10.20.14.83:9002/imservices/claim?id=' +id1 +'&claimStatus='+claimstatus,
			 data: {
				 id:	id1 ,
				 claimStatus : claimstatus
		       }
		    })
		    .then(function successCallback(response) {
		    	$scope.getPendingClaims();
		    	$scope.showMyAlertDialog("Success!", "Claim rejected.");
		    },function errorCallback(response) {
		    	alert("Server Error. Try After Some time: " + response);
		  });


	}
	

	$scope.approveClaimStatus=function(id1){
		  
		//console.log(id1);
		var claimstatus="rejected";
		$http({
			method: 'PUT',
			url: serverAddr +'/imservices/claim?id=' +id1 +'&claimStatus='+claimstatus,
			data : {
		        	id:id1 ,
		        	claimStatus:claimstatus
				}
		    })
		    .then(function successCallback(response){
		    	$scope.getPendingClaims();
		    	$scope.showMyAlertDialog("Success!", "Claim approved.");
		    },function errorCallback(response){
		    	alert("Server Error. Try After Some time: " + response);
		    });
		}
	

	$scope.getPendingagents = function(){
		console.log("hello");
		var users=[];
		$http({
	        method : 'GET',
	        url : 'http://10.20.14.83:9002//imservices/agent/pending',
	        headers : {
	              'Content-Type' : 'application/json',
	              'Access-Control-Allow-Origin': 'http://10.20.14.83:9001/'
	        }}).then(function successCallback(response) {
	        	$scope.pendingAgents = response.data;
	        	$scope.hideAllDivs();
	        	$scope.pendingAgentsDiv = true;
	        });             
	};


	$scope.approveagentStatus=function(username){
	  
	  
	     var claimstatus="approved";
	        
	    $http({
	        'method': 'PUT',
	        url:'http://10.20.14.83:9002/imservices/agent?userName=' + username +'&userType='+claimstatus,
	       
	        data : {
	        	userName: $scope.uname,
	        	userType:claimstatus
	        	}
	    })
	    .then(function successCallback(response) {
	    	$scope.getPendingagents();
	    	$scope.showMyAlertDialog("Success!", "Agent approved.");
	    }, function errorCallback(response) {
	    	alert("Server Error. Try After Some time: " + response);

	  });


	  
	  
	 }


	$scope.rejectagentStatus=function(username){
		var claimstatus="rejected";
		        
		    $http({
		        'method': 'PUT',
		        url:'http://10.20.14.83:9002/imservices/agent?userName=' +username +'&userType='+claimstatus,
		       
		        data : {
		        	userName:username ,
		        	userType:claimstatus
		     
		     
		       }
		    })
		    .then(function successCallback(response) {
		    	$scope.getPendingagents();
		    	$scope.showMyAlertDialog("Success!", "Agent rejected.");
		    	
		    }, function errorCallback(response) {
		    alert("Server Error. Try After Some time: " + response);

		  });

	}
	
	
	$scope.logout = function(){
		$cookieStore.put('auth-token', null);
		$cookieStore.put('uname', null);
		$cookieStore.put('userType', null);
		$location.path('/');
	}
	
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
				$scope.hideAllDivs();
				$scope.productsDisplayDiv=true;
				
				
        }, function errorCallback(response) {
        		alert("Server Error. Try After Some time: " + response);
        });
		
		$scope.searchProductName = "";
		$scope.searchAgentUName = "";
	
	}
	
	// view specific product
	$scope.viewProductDetails = function(prd){
		$scope.detailProduct = prd;
		$scope.hideAllDivs();
		$scope.productsDisplayDiv = true;
		$scope.productDetails = true;
	}

	$scope.hideProductDetails = function(){
		$scope.productDetails = false;
	}
	
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
				$scope.hideAllDivs();
				$scope.agentsDisplayDiv = true;
        }, function errorCallback(response) {
        		alert("Server Error. Try After Some time: " + response);
        });		
		
		$scope.searchProductName = "";
		$scope.searchAgentUName = "";
	}
	
	// view specific agent
	$scope.viewAgentDetails = function(ag){
		$scope.detailAgent = ag;
		$scope.hideAllDivs();
		$scope.agentsDisplayDiv = true;
		$scope.agentDetails = true;
		
	}

	$scope.hideAgentDetails = function(){
		$scope.agentDetails = false;
	}
	
	$scope.hideAllDivs= function(){
		$scope.pendingPoliciesDiv = false;
		$scope.pendingClaimsDiv = false;
		$scope.pendingAgentsDiv = false;
		
		$scope.productsDisplayDiv=false;
		$scope.productDetails = false;
		$scope.agentsDisplayDiv = false;
		$scope.agentDetails = false;
		
	}
	
	$scope.showMyAlertDialog = function (hdr, msg){
		$scope.header = hdr;
		$scope.message = msg;
		
		$('#myAlertDialog').modal('show');
		$(function() {
		    setTimeout(function() {
		        $("#myAlertDialog").modal('hide')
		    }, 2500);
		});
	}
	
	$scope.gotoHome = function(){
		$scope.hideAllDivs();
	}
}


controllers.IController = IController;
controllers.dCustomerController = dCustomerController;
controllers.adminController = adminController;

myMod.controller(controllers);


myMod.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller	:	'IController',
		templateUrl	:	'firstpage.html'
	})
	.when('/DCustomer', {
		controller	:	'dCustomerController',
		templateUrl	:	'DCustomer.html'
	})
	.when('/admin', {
		controller	:	'adminController',
		templateUrl	:	'admin.html'
	})
	.when('/aboutus', {
		controller	:	'IController',
		templateUrl	:	'aboutus.html'
	})
											
//	.when('/privacy', {
//		controller	:	'IController',
//		templateUrl	:	'privacypolicy.html'
//	})
//	.when('/termsOfUse', {
//		controller	:	'dCustomerController',
//		templateUrl	:	'termsofuse.html'
//	})
//	.when('/listingPolicy', {
//		controller	:	'adminController',
//		templateUrl	:	'listingpolicy.html'
//	})
//	
	
	.otherwise({redirectTo: '/'})
});