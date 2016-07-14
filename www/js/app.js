// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var vendorView = angular.module('vendorView', ['ionic','ngStorage','ngCordova'])

vendorView.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})




vendorView.config(function($stateProvider, $urlRouterProvider) {
  //$urlRouterProvider.otherwise("/indexView.html");
  $stateProvider
  .state('vendorView', {
    cache: false,
    url: '/vendorView',
    templateUrl: 'views/vendorView.html',
    controller:'vendorViewCtrl'
  })
  .state('activate', {
    cache: false,
    url: '/activate',
    templateUrl: 'views/activate.html',
    controller: 'vendorAppCtrl'
  })
  .state('start', {
    cache: false,
    url: '/start',
    templateUrl: 'views/start.html',
    controller: 'startCtrl'
  })
  .state('started', {
    cache: false,
    url: '/started',
    templateUrl: 'views/started.html',
    controller: 'startedCtrl'
  })
  //menu
  .state('menu', {
    url: '/menu',
    templateUrl: 'views/vendor-services-list.html',
    controller: 'VendorServicesListCtrl'
  })
  //gallery
  .state('gallery', {
    url: '/gallery',
    templateUrl: 'views/vendorDetails.html',
    controller: 'VendorDetailsCtrl'
  })
  //fabBook
  .state('fabBook', {
    url:'/fabBook',
    templateUrl: 'views/feed.html',
    controller: 'FeedCtrl'
  })
  //review
  .state('reviews', {
    url:'/reviews',
    templateUrl: 'views/reviews.html',
    controller: 'reviewCtrl'
  });

  $urlRouterProvider.otherwise(function($injector){
   var state = $injector.get('$state');
   var statusFlag = window.localStorage.getItem('statusFlag');
   var vendorId = window.localStorage.getItem('vendorId');
   var tab = window.localStorage.getItem('TabId');
   console.log(vendorId,tab,statusFlag);
   if((vendorId!=null) && (tab!=null) && (statusFlag == 0)){
    state.go('start');
   }
   else if( (vendorId==null) && (tab==null) && (statusFlag ==null)){
     state.go('activate');
   }
   else{
     state.go('vendorView');
    }  
});
})

