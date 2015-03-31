angular.module('users',['ngResource',
                        'ui.router',
                        'ui.bootstrap.showErrors',
                        'user.services',
                        'ngCookies'
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
                                controller : 'UsersController'
               })
               .state('userdetails',{
                                url : '/user/:id/',
                                templateUrl : 'app/users/details.tpl.html',
                                controller : 'UsersDetailController'

               })
               .state('useredit',{
                                url : '/user/edit/:id/',
                                templateUrl : 'app/users/edit.tpl.html',
                                controller : 'UsersController' 
               });
        }
]);

angular.module('users').controller('UsersDetailController',['$scope','$resource','$state','$location','UserUpdateService','$cookieStore','$rootScope',
                                   function($scope,$resource,$state,$location,UserUpdateService,$cookieStore,$rootScope){
                                         var UserResource = $resource('/users');      
                                         var userService = new UserUpdateService();

                                        $scope.findUser = function(_id){
                                                userService.$get({id : _id},function(result){
                                                         $scope.user = result['data'];
                                                });
                                         }

                                        if($state.params.id){
                                                $scope.findUser($state.params.id);
                                         }

                                    }
]);

angular.module('users').controller('UsersController',['$scope','$resource','$state','$location','UserUpdateService','$cookieStore','$timeout','$rootScope',
         function($scope,$resource,$state,$location,UserUpdateService,$cookieStore,$timeout,$rootScope){
                var UserResource = $resource('/users');      
                var userService = new UserUpdateService();
                var loadUsers = function(){
                   console.log('Load users is called.. ');
                   UserResource.query(function(result){
                              $scope.users = result; 
                              $cookieStore.put('users',result);
                        });                
                }
                
                if(!$cookieStore.get('users')){
                        loadUsers();
                }else{
                        $scope.users = $cookieStore.get('users');
                }

                $scope.createUser = function(){
                   $scope.$broadcast('show-errors-check-validity'); 
                   if ($scope.userCreateForm.$valid){ 
                        userService.name = $scope.userName;
                        userService.email = $scope.email;
                        userService.$save(function(result){
                                        UserResource.query(function(result){
                                           $cookieStore.put('users',result);
                                           $scope.users = result;     
                                           $location.path('/user/');
                                        });
                        });
                   }
                }

                $scope.findUser = function(_id){
                   userService.$get({id : _id},function(result){
                      $rootScope.user = result['data'];
                   });
                }
                $scope.editUser = function(_id){
                   userService.name = $rootScope.user.name;
                   userService.email = $rootScope.user.email;
                   userService.$update({id:_id},function(result){
                      $cookieStore.remove('users'); 
                      $location.path('/user/');     
                   })
                }

                $scope.deleteUser = function(_id){
                        userService.$delete({id:_id},function(result){
                                UserResource.query(function(result){
                                           $cookieStore.put('users',result);
                                           $scope.users = result;     
                                           $location.path('/user/');
                                        });
                        });
                }
        }
]);
