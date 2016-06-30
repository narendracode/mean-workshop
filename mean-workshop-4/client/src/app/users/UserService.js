var module = angular.module('user.services',['ngResource']);

module.factory('UserUpdateService',
               function($resource){
                  return $resource('users/:id',
                        {
                                id : '@id'
                        },
                        {
                                'update' : {method : 'PUT' }
                        },
                        {
                                'get' : { method : 'GET', isArray:false }
                        },
                        {
                                'delete' : {method : 'DELETE' }
                        },
                        {
                                'save' : { method : 'POST' }
                        }                  
                     );
               }
);
