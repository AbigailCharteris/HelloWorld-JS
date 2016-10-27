/*

requireJS is a browser specific incarnation of CommonJS for loading AMD modules. It has 3 main parts:

config file
define function module header
require function 
return function to support 


// Simplified CommonJS Wrapper for requireJS 
define("moduleName", function(require,exports, module)){

var someModule1 = require("moduleName1_defined_in_config");
var someModule2 = require("moduleName2_defined_in_config");
...
function1(){}
function2(){}

// // No longer use return
// return { 
//     someFn1 : function1
//     someFn2 : function2
// }

// instead use exports:
exports.func1 = function1;
exports.func2 = function2;

}

or

// no need to define module name when module is defined in its own file
define(["require", "exports"], function (require, exports) {
    
    "use strict";
     var someDependantModule = require("configModuleName/or location");
     ...

exports.func1 = function1;

})       




include requireJS optimizer (r.js) that will load all modules (*.js) into a single optimized module (main-optimized.js) and then minify it (main-optimized.min.js)
very similar to the process that Jinder used to put all JS/Html into a templates file...
Dowload r.js from the requireJS site and place in a lib folder separate from the node_module dependencies folder as this will be used in building only. 
Point node.exe r.js at the main.js or app.js files as r.js will traverse all dependencies and include them accordingly.

eg: node lib\r.js -o name=main baseUrl=client/app mainConfigFile=client/app/main.js out=client/app/main-optimized.min.js [optimize=none] [generateSourceMaps=true preserveLicenseComments=false optimize=uglify2] 
* we can disable minify by setting optize=none
** map compressed file back to original source file, note preserveLicenseComments needs to be set to false and uglify2 needs to be used for minifying as uglify1 doesnt support sourceMaps



list of output files will be output along with new file.

finally update index.html to ref new optimized main-optimized.min.js

eg:     <script data-main="main-optimised.min.js" src="/node_modules/requirejs/require.js"></script>

problem with optimised min files is that you can't debug script errors in the browser easily
2 options to resolve:
1) use un-optimized files in dev environment 
    Dev: <script data-main="main-optimised.min.js" src="/node_modules/requirejs/require.js"></script>
    Prod: <script data-main="main.js" src="/node_modules/requirejs/require.js"></script>

2) use Source Maps
    i.e. map compressed file back to original source file -- add generateSourceMaps=true in r.js cmd


finally create a build profile with all the command line options above. This allows cmd line to be simplified and you can set up .dev and .prod profiles accordingly
file=> build.config.js

({
    name: "main", 
    baseUrl: "../client/app", 
    mainConfigFile: "../client/app/main.js", 
    out: "../client/app/main-optimized.min.js", 
    optimize: "none",
    generateSourceMaps: "true", 
    preserveLicenseComments: "false", 
    optimize: "uglify2"
})

cmd line:node lib\r.js -o lib\build.config.js  (or build.dev.config.js and build.prod.config.js)


Most Common Config Options:

baseUrl: 
    root path for all module lookups, by default set to same location as html page including script tag or the location of data-main attribute which is typically main.js 
    can be overridden with baseUrl option i,e, if your code is located on a different server
paths:
   assumed relative to baseUrl, unless the path setting starts with / or has a URL http in it. 
   Alias long paths - eg: "scripts": "app/settings/someDir/someOtherDir.../more"  ---> therefore shortening the require signature: require(["scripts/myJsfile"])
   Supports navigating up path tree with ../ unlike absolute ref in require signature which needs to be a child of the baseUrl
shim:
    used for older dependencies that don't support requireJS natively. i.e. dependencies, exports, custom init, traditional 'browser globals' scripts that do not use define() to declare 
    dependencies and set a module value. i.e. short hand for an AMD requireJS compliant module def.    
    eg:

    require.config({
        paths:{
            underscore: "underscore-1.0.min"
        }
        shim:{
            underscore:{
                exports:"_",
                deps: ["jquery"]
            }
        }
    })

shim above under the covers transforms roughly to:

    define("underscore", ["jquery"], function ($) {
        return window["_"];
    });

* can combine path setting for shim in shim def

config:
    Need to be able to pass config data into modules. This is done in requireJS by a reserve "module" dependancy and accessed via a call to module.config()

eg:
require.config({
        config:{
            url: "http://someService.com"
        }
        paths:{
           ...
        }
        shim:{
            ...
        }
    })

define("someModule", ["module"], function(module){
    var url = module.config().url;
})

require(["app"], function(app){
    app.init();
})

### typically we don't use this approach, instead we declare a config.js module and just include it as a dependancy!
eg:

config.js:

define([],{
    return {
        url: "http://someService.com"
    };
});

someModule.js:

define(["config"], function(config){
    var url = config.url;
})


waitSeconds:
Timeout to load module before throwing an error, default is 7 seconds. Can be disabled by setting to Zero

deps & callback:
deps -> array of dependancies to load
callback -> function to exe once deps have loaded

require.config({
        deps:["module1","module2"]
        callback: function(module1, module2){
            ...
        }
    });

which is a little redundent as we can just stick with the below which does the same thing in essence

define(["module1","module2"], function(module1,module2){
    ...
});


urlArgs:
    extra querystring args appended to URLs that requireJS uses to fetch resourcs.
    Good use case is for cache busting with unique querystring on every call
    args will be appended to ALL url without the need for the ?

require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});


Plugins

Plugins extend requireJS but loading modules in a custome way and then handing them back to RequireJS.  plugin!moduleName is the typical syntax.

eg. Text Plugin - download from requireJS site and add to lib dir as a dev dep only (not npm node_module)


So if we wish to replace inline html in our module with an html template stored in an .html file (so we get syntax formatting etc)


define(["module1","module2"], function(module1,module2){
    
    var someTemplate = "<div>someHtml</div>";
});

becomes:

define(["module1","module2", "text!templates/myTemplate.html"], function(module1,module2, myTemplate){
    
    var someTemplate = myTemplate; // this will be pased in as plain text
});

* note: we have to specify the file extension.
** NB: Text plugin requires files to be served up by actual web server as it uses xhr request internally to load the files. So no file system based dev (we typically serve anyway) 

*/