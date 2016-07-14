vendorView.controller('reviewCtrl', ['$scope','$timeout','$localStorage','$sessionStorage', function($scope, $timeout,$localStorage,$sessionStorage){

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

    $scope.starrating=function(rating) {
      return new Array(rating);   //ng-repeat will run as many times as size of array
    }

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


}])