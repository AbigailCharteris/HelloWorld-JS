
/*
stateprovider: uses ui-sref on <a></a>, use ui-view instead of ng-view.

                $stateProvider
                    .state("home", {        // --> parent page
                        url: "/home",
                        // templateUrl: "App/home/detail/detail.html",  // --> relative to current page                        
                        template: "<h1>Ta da HOME</h1> testValue=' {{ctrl.testValue}}' {{4 * 4}}",
                        controller: "TempCtrl",
                        controllerAs: "ctrl",
                        params: {  // can be inherited by children
                            someObj : { value: "someVal" }
                        }
                        resolve: {      // use resolve to call a fn based on the state or param. Think ajax call/service call. the result is injected into the associated controllers constructor ( and it's children contorllers).
                            classroom: function ($stateParams, someService) {
                                return someService.getSomeData($stateParams.id);
                            }
                        }  
                        // abstract: true // set if you want child states to inherit props, can't instantiate an abstract state, child urls will be a concat of parent and child url
                    })
                    .state("home.detail", { // nested child state/route
                        url: "/",
                        template: "index.html",
                        controller: "TempCtrl",
                        controllerAs: "ctrl",
                        // parent: "/home"   // -> parent supports both url/state as a ref
                        parent: home        // can use parentName.child syntax to indicate a nested route
                    })
                    .state("home.summary", {
                        url: "/detail",
                        templateUrl: "/home/detail/detail.html",
                        //controller: "helloWorld.studentRegister.home.detailCtrl",
                        controller: DetailCtrl.default.fullName,
                        controllerAs: "ctrl",
                        params: {}
                    });

                $urlRouterProvider.otherwise("/");


// to use multiple named views i.e. <div ui-view="view1"></div> <div ui-view="view2"></div>

                    .state("home.detail", { // nested child state/route
                        url: "/",
                        views:{
                            'view1':{
                                templateUrl: "someUrl",
                                controller: "someController"
                            },
                            'view2':{
                                templateUrl: "someUrl",
                                controller: "someController"
                            }
                        }
                        // parent: "/home"   // -> parent supports both url/state as a ref
                        parent: home        // can use parentName.child syntax to indicate a nested route
                    })


*/