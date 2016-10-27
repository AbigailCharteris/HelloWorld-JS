// Define All the JS dependencies here (just like .Net Unity container!!)
// We don't need to list all the js script in the index.html file, only add the below to kickstart the app
// <script data-main="main.js" src="/node_modules/requirejs/require.js"></script>
// esLint suppression
/* 
  global 
  require
*/
require.config({
    //baseUrl: "js",  // not typically needed if you start in app root    
    paths: {
        "angular": "node_modules/angular/angular",
        // "ngRoute": "node_modules/angular-route/angular-route.min",
        "ui.router": "node_modules/angular-ui-router/release/angular-ui-router.min",
        "ui.router.extras": "node_modules/ui-router-extras/release/ct-ui-router-extras.min",
        "require": "node_modules/requirejs/require",
        "exports": "node_modules/exports/lib/exports"

    },
     /**
     * shim --> for libs that either do not support AMD out of the box, or
     * require some fine tuning for dependency mgt'
     */
    shim: {
        "angular": { exports: "angular" },  // This ensures angular is globally available 
        // "angularAMD": ["angular"],
        // "ngRoute": ["angular"],
         "ui.router": ["angular"],
         "ui.router.extras": ["angular"]
        //"app": ["ngRoute"],
        //"app": ["ui.router"]
    },
    deps: ["app"],  // dependency which loads app.js
});

// DI angular, ngRoute, app.js and then bootstrap our app!
//require(["angular", "app"], function (angular, app) {
require(["angular", "app", "ui.router" ], 
function (angular, app, uiRouter) {
    angular.bootstrap(document, ["myApp"]);
});