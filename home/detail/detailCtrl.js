// no need to define module name when module is defined in its own file
//define(["require", "exports"], function (require, exports) {
define(function(require,exports, module){
    
    "use strict";

var angular = require("angular");
var uiRouterExtras = require("ui.router.extras");

// var someDependantModule = require("configModuleName/or location");   
    
    var DetailCtrl = (function () {

        // function Constructor
        // function DetailCtrl($scope, $previousState, $state, $stateParams, $timeout, $log, $modal, $q) {
        function DetailCtrl($scope, $state, $stateParams, $timeout, $log, $q) {

            var _this = this;
            this.$scope = $scope;
            // this.$previousState = $previousState;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            this.$log = $log;
            // this.$modal = $modal;
            this.$q = $q;
            
            $scope.$on("http-error", function (e, response) { return _this.handleHttpError(response); });
            $scope.$on("http-unauthorized", function (e, response) { return _this.handleHttpUnauthorizedError(response); });

            this.testValue = "Hello";

            console.log("scope.testvalue = " + this.testValue);
            console.log("DetailCtrl ctor loaded");
        }

        Object.defineProperty(DetailCtrl, "fullName", {
            get: function () {
                return "helloWorld.studentRegister.home.detailCtrl";                
            },
            enumerable: true,
            configurable: true               
        });

        // DetailCtrl.register = function (mod) {
         var register = function (mod) {
            console.log("registering...");
            mod.controller(DetailCtrl.fullName, [
                "$scope",
                // "$previousState",
                "$state",
                "$stateParams",
                "$timeout",
                "$log",
                // "$modal",
                "$q",
                DetailCtrl
            ]);
            console.log("DetailCtrl registered");            
        };

        //return DetailCtrl; // returns all functions

        exports.register = register;
        exports.fullName = DetailCtrl.fullName;
        exports.default = DetailCtrl;

        //alternatively: export.functionName = Module_function1;  // Revealing Module Pattern with pseudo private/public functions
    }());

    //babel export syntax
    // Object.defineProperty(exports, "__esModule", { value: true });
    // exports.default = DetailCtrl;
});
