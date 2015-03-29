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
                                'get' : { method : 'GET' }
                        },
                        {
                                'delete' : {method : 'DELETE' }
                        },
                        {
                                'save' : { method : 'POST' }
                        },
                        {
                                'query' : { 
                                   method : 'GET',
                                   isArray: true 
                                }
                        }
                  );
               }
);
