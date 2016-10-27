// esLint suppression
/* 
    global 
    define   
*/

 define(["require", "exports", "angular", "ui.router", "./detailCtrl"],
    function (require, exports, angular, uiRouter, DetailCtrl) {

       "use strict";

        var module = angular.module("detailModule", ["ui.router"]);

        // list functions in given object
        // console.log(Object.getOwnPropertyNames(DetailCtrl).filter(function (p) {
        //     return typeof DetailCtrl[p] === "function";
        // }));
        
        DetailCtrl.register(module);

       /*
            This ui router config doesn't seem to work as expected
            We should be able to register more routes any any module.
       */ 

        // module.config(["$stateProvider", function ($stateProvider) {        
        module.config(function ($stateProvider) {        
            $stateProvider
                .state("detail", {
                    url: "/detail",                    
                    templateUrl: "/home/detail/detail.html",
                    controller: DetailCtrl.fullName,
                    controllerAs: "ctrl",
                    params: {}
                })
                .state("summary", {
                    url: "/summary",                    
                    template: "<h1>module defined template</h1><p>4 * 4 = '{{4 * 4}}' ctrl.testValue='{{ctrl.testValue}}'",
                    //controller: "helloWorld.studentRegister.home.detailCtrl",
//## -->> HERE                    //controller: (a) => {this.testValue = "summaryController";},
                    //controllerAs: "ctrl",
                    parent:"detail",
                    params: {}
                });
        });

console.log("module loaded: " + module);
console.log("module config: " + module.config);

            Object.defineProperty(exports, "__esModule", { value: true });
            exports.default = module;

        });



// define(["require", "exports", "angular", "./HomeController", "./DataSourcesSelector/DataSourcesSelectorDirective"], 
// function (require, exports, angular, HomeController_1, DataSourcesSelectorDirective_1) {

//     "use strict";

//     var module = angular.module("com.gs.opstech.datasearch.home.Homemodule", []);

//     module.directive('gsDataSourcesSelector', DataSourcesSelectorDirective_1.default);

//     HomeController_1.default.register(module);

//     module.config(["$stateProvider", function ($stateProvider) {
//             $stateProvider.state("home", {
//                 sticky: true,
//                 url: "/{embeddeDesktopTag:embedded\-[A/].}?{dataSourceKeyHome}",
//                 templateurl: "app/home/Home.html",
//                 controller: HomeController_1.default.fullName + " as ctrl",
//                 params: {
//                     embeddedoesktopTag: {
//                         value: null,
//                         squash: true
//                     }
//                 }
//             });
//         }]);

//     Object.defineProperty(exports, "__esModule", { value: true });
//     exports.default = module;
// });
