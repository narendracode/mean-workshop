angular.module('app',['ngResource','ui.router','users']);

angular.module('app')
                .config(['$stateProvider','$urlRouterProvider',
                        function($stateProvider,$urlRouterProvider){
                                $urlRouterProvider.otherwise('/');
                                $stateProvider.state('index',{
                                        url: '/',
                                        templateUrl : 'app/index.tpl.html',
                                        controller: 'AppCtrl'
                                });
                        }
]);

angular.module('app').controller('AppCtrl',['$scope','$location','$rootScope',
                                            function($scope,$location,$rootScope){
                                        $scope.message = "Welcome to MEAN Workshop";
                                 }
]);

angular.module('app').controller('HeaderCtrl',['$scope','$location',
                                 function($scope,$location){
                                       $scope.head = "MEAN";
                                 }
]);
