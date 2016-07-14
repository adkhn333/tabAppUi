    // here TabId is the unique id that is assigned to each tab and it is stored in local storage during activation of tab
    // here debit Id == impressionAssignId
 vendorView.controller('vendorViewCtrl' , ['$scope','$localStorage','$sessionStorage','$timeout', '$ionicModal','$ionicHistory',function($scope,$localStorage,$sessionStorage,$timeout,$ionicModal,$ionicHistory){  
    console.log("vendorView controller working");
    
    // $scope.history = $ionicHistory.viewHistory();
    // if($ionicHistory.clearHistory()){
    //    console.log('history cleared');
    //    console.log($scope.history);
    // }
   
    //    console.log($scope.history);
     

      $scope.history = Object.keys($ionicHistory.viewHistory().views).length;
      console.log($scope.history);
      if($scope.history != 1){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        console.log(Object.keys($ionicHistory.viewHistory().views).length);
      }

     $scope.history = $ionicHistory.viewHistory();
      console.log($scope.history);
    
    // document.onload = function () {
    //   document.addEventListener("deviceready", onDeviceReady, false);
    // };
    
    // function onDeviceReady() {
    //   document.addEventListener("backbutton", function (e) {
    //     e.preventDefault();
    //     console.log("hello");
    //   }, false);
    // }
    
    
    $localStorage.query= [];
    $localStorage.impressionUsedArray=[];
    $scope.slides=[];
    $scope.slides = $localStorage.imageArray;
    console.log($scope.slides);
    var company = [];
    company = JSON.parse(localStorage.getItem('impressionArray'));
    console.log(company);
    var INTERVAL = 5000;
    // function setCurrentSlideIndex(index) {
    //   $scope.currentIndex = index;
    // }
    function isCurrentSlideIndex(index) {
      return $scope.currentIndex === index;
    }
    function nextSlide() {
      // $scope.slide = $scope.slides[$scope.currentIndex];
      // console.log($scope.slide);
      //console.log($scope.slides);
      calImpression($scope.currentIndex);   
      $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;    
      var date = window.localStorage.getItem('date');
      var statusFlag = window.localStorage.getItem('statusFlag');
      var currentDate =  Math.floor(new Date().getTime()/86400000);
      if ((currentDate == date) && (statusFlag == 1)) {
        $timeout(nextSlide, INTERVAL);
        console.log("nextSlide working");
      }
    }
    //this function call nextSlide function to load images after specified interval of time
    function loadSlides() {
        // calImpression($scope.currentIndex);  
        $timeout(nextSlide, INTERVAL);
      }
      $scope.currentIndex = 0;
      $scope.isCurrentSlideIndex = isCurrentSlideIndex;
      //loadSlides function is called to load the image
      loadSlides();


//model functionality
    $ionicModal.fromTemplateUrl('userQuery-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        // Execute action
      });

      $scope.showModal= function(imgIndex){
        console.log(imgIndex);
        $scope.imgIndex = imgIndex;
        console.log($scope.imgIndex);
        $scope.openModal();
      } 


     // save user query in database when user clicks on particular image
     $scope.updateUserQuery = function(username, useremail, usermobile, query){
      console.log("hello");
      console.log( $scope.imgIndex);
      var i =  $scope.imgIndex;
      var companyArray = [];
      companyArray = JSON.parse(localStorage.getItem('impressionArray'));
      console.log(companyArray);
      var TabId =window.localStorage.getItem('TabId');
      var vendorId =window.localStorage.getItem('vendorId');
      var DebitId = companyArray[i].impressionAssignId;
      var companyId = companyArray[i].companyId;
      var today = new Date().getTime();
     
      var query={
        userName : username,
        userEmail :useremail,
        userMobile : usermobile,
        userQuery : query,
        tabId : TabId,
        vendorId :vendorId,
        debitId : DebitId,
        companyId : companyId,
        date : today
      }   
      $localStorage.query.push(query);
      $scope.closeModal();
    }

    //function to update impressions and store updated impressions in an array in local storage
    function calImpression(i){
      console.log(i); 
      var date = window.localStorage.getItem('date');
      var statusFlag = window.localStorage.getItem('statusFlag');
      var currentDate =  Math.floor(new Date().getTime()/86400000);
      if ((currentDate == date) && (statusFlag == 1)) {
        var currentDate= Math.floor(new Date().getTime()/1000);
        if ( (company[i].status == 'running') && (company[i].impressionAssigned > company[i].impressionUsed) ){
          console.log('true2');
          company[i].impressionUsed+=1;
          console.log(company[i].impressionUsed);
          var impressionUsed = company[i].impressionUsed;
          console.log(impressionUsed);
          $localStorage.impressionUsedArray[i] = impressionUsed;
          $localStorage.impressionUsedArray[i];

        } 
      } 
    }
    // function to set status flag to 0 and call sync page
    $scope.endDay = function(){
      var statusFlag = 0;
      window.localStorage.setItem('statusFlag', statusFlag);
      var currentDate = new Date().getTime();
      var date = window.localStorage.getItem('date');
      statusFlag = window.localStorage.getItem('statusFlag');
      if (statusFlag==0) {
       window.location = "#/started";
     }
    }

    $scope.reviewPage=function(){ 
      window.localStorage.setItem("impressionArray", JSON.stringify(company));
      var statusFlag = 0;
      window.localStorage.setItem('statusFlag', statusFlag);
      statusFlag = window.localStorage.getItem('statusFlag');
      if (statusFlag==0) {
       window.location = "#/reviews";
     }
   }

      $scope.menuPage=function(){
      window.localStorage.setItem("impressionArray", JSON.stringify(company));  
      var statusFlag = 0;
      window.localStorage.setItem('statusFlag', statusFlag);
      statusFlag = window.localStorage.getItem('statusFlag');
      if (statusFlag==0) {
       window.location = "#/menu";
     }
    }

     $scope.galleryPage=function(){
      window.localStorage.setItem("impressionArray", JSON.stringify(company));
      var statusFlag = 0;
      window.localStorage.setItem('statusFlag', statusFlag);
      statusFlag = window.localStorage.getItem('statusFlag');
      if (statusFlag==0) {
       window.location = "#/gallery";
     }
    }

    }])