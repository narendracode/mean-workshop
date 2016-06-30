/*angular.module('ui.compareTo', [])
.directive('compareTo',function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

*/



!function(a,b,c){
    "use strict";
    function d(a){
        return{
            require:"?ngModel",
            restrict:"A",
            link:function(b,d,e,f){
                function g(a){
                    return f.$pristine&&f.$isEmpty(a)||a===i(b)?(f.$setValidity("match",!0),a):(f.$setValidity("match",!1),c)
                }
                function h(a){
                    return a===c?f.$isEmpty(f.$viewValue)?c:f.$viewValue:a
                }
                if(!f)
                    return void(console&&console.warn&&console.warn("Match validation requires ngModel to be on the element"));
                var i=a(e.match),j=a(e.ngModel).assign;
                b.$watch(e.match,function(){
                    j(b,g(f.$viewValue))
                }),
                f.$parsers.unshift(g),
                f.$formatters.unshift(h)
            }
        }}
    b.module("validation.match",[]),
    b.module("validation.match").
    directive("match",d),
        d.$inject=["$parse"]
}(window,window.angular);
