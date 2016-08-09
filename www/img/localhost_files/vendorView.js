    // here tabId is the unique id that is assigned to each tab and it is stored in local storage during activation of tab
    // here debit Id == impressionAssignId
vendorView.controller('vendorViewCtrl' , ['$scope','$localStorage','$sessionStorage','$timeout', '$ionicModal','$ionicHistory','$ionicSlideBoxDelegate','$ionicPopup','$interval',
  function($scope,$localStorage,$sessionStorage,$timeout,$ionicModal,$ionicHistory,$ionicSlideBoxDelegate,$ionicPopup,$interval){  
    // console.log("vendorView controller working");
    // $scope.history = Object.keys($ionicHistory.viewHistory().views).length;
    // console.log($scope.history);

    // check for tab height
    // console.log(window.screen.height);
    $scope.height = window.screen.height;


    if($scope.history != 1) {
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
      console.log(Object.keys($ionicHistory.viewHistory().views).length);
    }

    $scope.history = $ionicHistory.viewHistory();
    console.log($scope.history);
    $scope.slides=[];
    $localStorage.query= [];
    $localStorage.impressionUsedArray=[];
    $scope.slides = JSON.parse(localStorage.getItem('imageArray'));
    console.log($scope.slides);
    try { 
      $scope.slidesLen = $scope.slides.length;
    }
    catch(e) {  
      console.log("no slide");
    }
    //$scope.slidesLen = $scope.slides.length;
   
    var company = [];
    company = JSON.parse(localStorage.getItem('impressionArray'));
    console.log(company); 
  
    if($scope.slidesLen == 1 ){
      $interval(function () {
        var statusFlag = window.localStorage.getItem('statusFlag');
            //Display the current time.
            if(statusFlag == 1){
          console.log('hii');
          $scope.callImpression(0);
        }
        }, 10000);
    }

    $scope.options = {
      direction: 'vertical',
      slidesPerView: '1',
      paginationClickable: false,
      showNavButtons: false,
      loop: true,
      autoplay: false,
      speed: 250,
      showPager: false
    };

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
      // note: the indexes are 0-based
      // $scope.activeIndex = data.activeIndex;
      // $scope.previousIndex = data.previousIndex;
      console.log(data.activeIndex);
      $scope.slideHasChanged(data.activeIndex);
    });

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      // grab an instance of the slider
      // $scope.slider = data.slider;
      $interval(function() {
        try {
          data.slider.slideNext();
        }
        catch(e) {
          console.log(e.toString());
          if(e.indexOf('params') != -1) {
            console.error(e);
          } 
          console.log(e);
        }
      },5000);
    });

    $scope.data = {};

    $scope.$watch('data.slider', function(slider) {
      console.log('My slider object is ', slider);
      // Your custom logic here
    });

    $scope.slideHasChanged=function(index) {
      console.log(index);
      $scope.callImpression(index);
    }

    //query pop up
    $scope.imagePopup = function(index) {
      console.log(index);
      $scope.imgIndex = index;
      console.log($scope.imgIndex);
      $scope.data = {};
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        templateUrl:"templates/query-pop-up.html",
        title: 'How can we help you',
        scope: $scope,

        buttons: [
          { text: 'Cancel', 
            onTap: function(e) {
               myPopup.close(); 
            }
          },
          {
            text: '<b>Submit</b>',
            type: 'button-positive',
            onTap: function(e) {
              $scope.updateUserQuery($scope.data.username,$scope.data.useremail,$scope.data.usermobile,$scope.data.query);
            }
          }
        ]
      });
      myPopup.then(function(res) {
      });
    };

    // save user query in database when user clicks on particular image
    $scope.updateUserQuery = function(username, useremail, usermobile, query){
      console.log("hello");
      console.log( $scope.imgIndex);
      var i =  $scope.imgIndex;
      var companyArray = [];
      companyArray = JSON.parse(localStorage.getItem('impressionArray'));
      console.log(companyArray);
      var tabId =window.localStorage.getItem('tabId');
      var vendorId =window.localStorage.getItem('vendorId');
      var DebitId = companyArray[i].impressionAssignId;
      var companyId = companyArray[i].companyId;
      var today = new Date().getTime();
    
      var query={
        userName : username,
        userEmail :useremail,
        userMobile : usermobile,
        userQuery : query,
        tabId : tabId,
        vendorId :vendorId,
        debitId : DebitId,
        companyId : companyId,
        date : today
      }   
      $localStorage.query.push(query);
    }

    //function to update impressions and store updated impressions in an array in local storage
    $scope.callImpression = function(i){
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

    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
      $scope.data = {};
      $scope.password = 1234;
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="data.pass">',
        title: 'Enter Exit Password',
        subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: 'Cancel', 
            onTap: function(e) {
              myPopup.close(); 
            }
          },
          {
            text: '<b>Enter</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!($scope.data.pass == $scope.password)) {
                //don't allow the user to close unless he enters exit password
                e.preventDefault();
              } else {
                $scope.endDay();
              }
            }
          }
        ]
      });
      myPopup.then(function(res) {
      });

      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 10000);
    };
     
    // function to set status flag to 0 and call sync page
    $scope.endDay = function() {
      var statusFlag = 0;
      window.localStorage.setItem('statusFlag', statusFlag);
      var currentDate = new Date().getTime();
      var date = window.localStorage.getItem('date');
      statusFlag = window.localStorage.getItem('statusFlag');
      if (statusFlag==0) {
        window.location = "#/started";
      }
    }
}])