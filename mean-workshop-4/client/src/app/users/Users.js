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
                                controller : 'UsersController'
               })
               .state('userdetails',{
                                url : '/user/:id',
                                templateUrl : 'app/users/details.tpl.html',
                                controller : 'UsersController'

               })
               .state('useredit',{
                                url : '/user/edit/:id',
                                templateUrl : 'app/users/edit.tpl.html',
                                controller : 'UsersController'
               });
        }
]);

angular.module('users').controller('UsersController',['$scope','$resource','$state','$location','UserUpdateService',
                                   function($scope,$resource,$state,$location,UserUpdateService){
                
                var loadUsers = function(){
                
                }

                $scope.createUser = function(){
                   $scope.$broadcast('show-errors-check-validity'); 
                   if ($scope.userCreateForm.$valid){ 
                        console.log('Create User ... ');
                   }
                }
        }
]);
