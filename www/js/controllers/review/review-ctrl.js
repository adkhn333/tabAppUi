vendorView.controller('reviewCtrl', ['$scope','$timeout','$localStorage','$sessionStorage',
 function($scope, $timeout,$localStorage,$sessionStorage){

    console.log('review working');
    var statusFlag = 1;
    window.localStorage.setItem('statusFlag', statusFlag);
    // var impressionRetrieveArray=[];
    // var company = [];
    // company = JSON.parse(localStorage.getItem('company'));
    // console.log(company);
    // impressionRetrieveArray = $localStorage.impressionUsedArray;
    // console.log(impressionRetrieveArray);
    // var len = company.length;
    // var j=0;
    // update(j,len,company,impressionRetrieveArray);


   $scope.ratingsObject = {
    iconOn: 'ion-ios-star',
    iconOff: 'ion-ios-star-outline',
    iconOnColor: 'rgb(200, 200, 100)',
    iconOffColor: 'rgb(200, 100, 100)',
    rating: 4,
    minRating: 0,
    readOnly:false,
    callback: function(rating) {
      $scope.ratingsCallback(rating);
    }
  };

  $scope.ratingsCallback = function(rating) {
    console.log('Selected rating is : ', rating);
  };

    // get details of different companies and impression used by companies from local storage array 
  //'company' and  'impressionUsedArray' respectively and then call update function 
 
   
  
  //update the new impression values in database 
 //   function update(j,len,company,impressionRetrieveArray){
 //    if (j<len) {
 //      console.log(company,impressionRetrieveArray);
 //      var TabId = window.localStorage.getItem('TabId');
 //      firebase.database().ref('impressionDebitted/'+company[j].companyId+'/'+company[j].impressionAssignId).once('value', function(snapshot){
 //        console.log(j);
 //        console.log(company[j].companyId);
 //        var debitId = snapshot.val().impressionAssignId;
 //        //console.log(impressionRetrieveArray[j]);
 //        var updates = {};
        
 //        updates['/impressionDebitted/' + company[j].companyId + '/' + debitId + '/impressionUsed'] = impressionRetrieveArray[j];
 //        console.log('/impressionDebitted/' + company[j].companyId + '/' + debitId + '/impressionUsed');
 //        try{
 //          firebase.database().ref().update(updates);
 //          console.log('Impression Used Updated');  
 //        }catch(e){
 //         updatePrevious(company,j,impressionRetrieveArray);
 //         j++;
 //         update(j,len,company,impressionRetrieveArray);
 //       }
 //     }).then(function(){
 //       updatePrevious(company,j,impressionRetrieveArray);
 //       j++;
 //       update(j,len,company,impressionRetrieveArray);
 //     })
 //   };  
 // }// checks if used impression is equal to total assigned impression or if today's date is greater than company's endDate 
 // // and if true, than move that company details from current to previous path of tab campaigns and change that companies impression status to completed 
 // //and delete the same company's information from current path of tab campaigns
 // function updatePrevious(company,j,impressionRetrieveArray){
 //  var currentDate = Math.floor(new Date().getTime()/1000);
 //  if( (impressionRetrieveArray[j] == company[j].impressionAssigned) || (currentDate >company[j].endDate) ){
 //      console.log("hello");
 //      //update impression status to completed
 //      var status = 'completed';
 //      var updates = {};
 //      console.log(company[j].impressionAssignId);
 //      updates['impressionDebitted/'+company[j].companyId+'/'+company[j].impressionAssignId+'/status'] = status;
 //      firebase.database().ref().update(updates);

 //      firebase.database().ref('impressionDebitted').on('child_added',function(snapshot){
 //        //searching for particular tabId 
 //        snapshot.forEach(function(data) {
 //          console.log(data);
 //          if(data.val().status == "completed" && data.val().impressionAssignId == company[j].impressionAssignId){
 //            $scope.debitId = data.val().impressionAssignId;            
 //            $scope.companyId = data.val().companyId;
 //            $scope.TabId = data.val().TabId;
 //            var debitId = data.val().impressionAssignId;

 //            var newcampaignkey = firebase.database().ref('/tabCampaign/' + $scope.TabId + '/campaigns/previous').push({
 //              companyId : $scope.companyId,
 //              debitId : $scope.debitId
 //            }).key;
 //            firebase.database().ref('/tabCampaign/' + $scope.TabId + '/campaigns/previous/' + newcampaignkey).set({
 //              companyId : $scope.companyId,
 //              debitId : $scope.debitId
 //            });
 //            console.log("UpdatedPrevious");
 //            console.log(debitId);
 //            firebase.database().ref('/tabCampaign/' + $scope.TabId + '/campaigns/current').orderByChild('debitId').equalTo(debitId).on('child_added',function(snapshot){
 //              var key = snapshot.key;
 //              firebase.database().ref('/tabCampaign/' + $scope.TabId + '/campaigns/current/'+key).remove();
 //            })
 //            console.log('deleted from current');
 //          }
 //        })
 //      })
 //    }
 //  }


}]);


vendorView.directive('ionicRatings',ionicRatings);
  
  function ionicRatings () {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div class="text-center ionic_ratings">' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(1)" style="font-size:33px;margin:0 5%;" ng-show="rating < 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" style="font-size:33px;margin:0 5%;" ng-show="rating > 0" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(2)" style="font-size:33px;margin:0 5%;" ng-show="rating < 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" style="font-size:33px;margin:0 5%;" ng-show="rating > 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(3)" style="font-size:33px;margin:0 5%;" ng-show="rating < 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" style="font-size:33px;margin:0 5%;" ng-show="rating > 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(4)" style="font-size:33px;margin:0 5%;" ng-show="rating < 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" style="font-size:33px;margin:0 5%;" ng-show="rating > 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(5)" style="font-size:33px;margin:0 5%;" ng-show="rating < 5" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" style="font-size:33px;margin:0 5%;" ng-show="rating > 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '</div>',
      scope: {
        ratingsObj: '=ratingsobj'
      },
      link: function(scope, element, attrs) {

        //Setting the default values, if they are not passed
        scope.iconOn = 'ion-ios-star';
        scope.iconOff = 'ion-ios-star-outline';
        scope.iconOnColor ='rgb(200, 100, 100)';
        scope.iconOffColor = 'rgb(200, 200, 100)';
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
  