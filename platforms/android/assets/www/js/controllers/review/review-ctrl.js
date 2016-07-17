vendorView.controller('reviewCtrl', ['$scope','$timeout','$localStorage','$sessionStorage','$ionicPopup',
 function($scope, $timeout,$localStorage,$sessionStorage,$ionicPopup){

  console.log('review working');
  var statusFlag = 1;
  window.localStorage.setItem('statusFlag', statusFlag);
   $scope.ratingsObject= {
      iconOn: 'ion-ios-star',
      iconOff: 'ion-ios-star-outline',
      iconOnColor: 'rgb(200, 100, 100)',
      iconOffColor: 'rgb(200, 100, 100)',
      rating: 0,
      minRating: 0,
      readOnly:false,
      callback: function(rating) { 
        $scope.ratingsCallback(rating);
      }
    };

    $scope.ratingsCallback = function(rating) {
      console.log(rating);
    };

  $scope.starrating=function(rating) {
    return new Array(rating);   //ng-repeat will run as many times as size of array
  }
   //query pop up
  $scope.reviewPopUp = function(index) {
      console.log(index);
      $scope.imgIndex = index;
      console.log($scope.imgIndex);
      $scope.data = {};
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        templateUrl:"templates/review-pop-up.html",
        title: 'Write Review',
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
    
}]);



//directive for ionic rating
vendorView.directive('ionicRatings',ionicRatings);
function ionicRatings () {
  return {
    restrict: 'AE',
    replace: true,
    template: '<div class="text-center ionic_ratings">' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(1)" style="font-size:20px;margin:0 5%;" ng-show="rating < 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" style="font-size:20px;margin:0 5%;" ng-show="rating > 0" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(2)" style="font-size:20px;margin:0 5%;" ng-show="rating < 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" style="font-size:20px;margin:0 5%;" ng-show="rating > 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(3)" style="font-size:20px;margin:0 5%;" ng-show="rating < 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" style="font-size:20px;margin:0 5%;" ng-show="rating > 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(4)" style="font-size:20px;margin:0 5%;" ng-show="rating < 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" style="font-size:20px;margin:0 5%;" ng-show="rating > 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(5)" style="font-size:20px;margin:0 5%;" ng-show="rating < 5" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" style="font-size:20px;margin:0 5%;" ng-show="rating > 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '</div>',
    scope: {
      ratingsObj: '=ratingsobj'
    },
    link: function(scope, element, attrs) {

      //Setting the default values, if they are not passed
      scope.iconOn = 'ion-ios-star';
      scope.iconOff = 'ion-ios-star-outline';
      scope.iconOnColor ='rgb(200, 100, 100)';
      scope.iconOffColor = 'rgb(200, 100, 100)';
      scope.rating = scope.ratingsObj.rating || 0;
      scope.minRating = scope.ratingsObj.minRating || 0;
      scope.readOnly = scope.ratingsObj.readOnly || false;

      //Setting the color for the icon, when it is active
      scope.iconOnColor = {
        color: scope.iconOnColor
      };

      //Setting the color for the icon, when it is not active
      scope.iconOffColor = {
        color: scope.iconOffColor
      };

      //Setting the rating
      scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

      //Setting the previously selected rating
      scope.prevRating = 0;

      //Called when he user clicks on the rating
      scope.ratingsClicked = function(val) {
        if (scope.minRating !== 0 && val < scope.minRating) {
          scope.rating = scope.minRating;
        } else {
          scope.rating = val;
        }
        scope.prevRating = val;
        scope.ratingsObj.callback(scope.rating);
      };

      //Called when he user un clicks on the rating
      scope.ratingsUnClicked = function(val) {
        if (scope.minRating !== 0 && val < scope.minRating) {
          scope.rating = scope.minRating;
        } else {
          scope.rating = val;
        }
        if (scope.prevRating == val) {
          if (scope.minRating !== 0) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = 0;
          }
        }
        scope.prevRating = val;
        scope.ratingsObj.callback(scope.rating);
      };
    }
  }
}
