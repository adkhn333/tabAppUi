//routing states and their respective urls 
vendorView.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('vendorView', {
    // cache: false,
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
});

