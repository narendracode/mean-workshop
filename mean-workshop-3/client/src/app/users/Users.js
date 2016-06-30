angular.module('users',['ngResource',
                        'ui.router',
                        'ui.bootstrap.showErrors',
                        'user.services'
                        ]);

angular.module('users').config(['$stateProvider','$urlRouterProvider',
        function($stateProvider,$urlRouterProvider){
               $urlRouterProvider.otherwise('/');
               $stateProvider
               .state('user',{
                                url : '/user/',
                                templateUrl : 'app/users/list.tpl.html',
                                controller : 'UsersController'
               })
               .state('usercreate',{
                                url : '/user/create/',
                                templateUrl : 'app/users/create.tpl.html',
                                controller : 'UserCreateController'
               })
               .state('userdetails',{
                                url : '/user/:id/',
                                templateUrl : 'app/users/details.tpl.html',
                                controller : 'UserEditController'

               })
               .state('useredit',{
                                url : '/user/edit/:id/',
                                templateUrl : 'app/users/edit.tpl.html',
                                controller : 'UserEditController' 
               });
        }
]);



angular.module('users').controller('UsersController',['$scope','$resource','$state','$location','UserUpdateService','$rootScope',
         function($scope,$resource,$state,$location,UserUpdateService,$rootScope){
                var UserResource = $resource('/users');      
                var userService = new UserUpdateService();
                   var userResource = new UserResource();
                   userResource.$get(function(result){
                              console.log(JSON.stringify(result));
                              $scope.users = result['data']; 
                        });                

                $scope.deleteUser = function(_id){
                        userService.$delete({id:_id},function(result){
                                userResource.$get(function(result){
                                           $scope.users = result['data'];      
                                });
                        });
                }
        }
]);

angular.module('users').controller('UserCreateController',['$scope','$resource','$state','$location','UserUpdateService','$rootScope',
         function($scope,$resource,$state,$location,UserUpdateService,$rootScope){
                var userService = new UserUpdateService();
                $scope.createUser = function(){
                   $scope.$broadcast('show-errors-check-validity'); 
                   if ($scope.userCreateForm.$valid){ 
                        userService.name = $scope.userName;
                        userService.email = $scope.email;
                        userService.$save(function(result){
                              $location.path('/user/');
                        });
                   }
                }

         }]);

angular.module('users').controller('UserEditController',['$scope','$resource','$state','$location','UserUpdateService','$rootScope','$stateParams',
         function($scope,$resource,$state,$location,UserUpdateService,$rootScope,$stateParams){
          
                var userService = new UserUpdateService();
                  console.log("find user with id : "+$stateParams.id);
                   userService.$get({id : $stateParams.id},function(result){
                      $scope.user = result['data'];
                   });
                
                $scope.editUser = function(_id){
                   userService.name = $scope.user.name;
                   userService.email = $scope.user.email;
                   userService.$update({id:_id},function(result){
                      $location.path('/user/');     
                   })
                }



         }]);



