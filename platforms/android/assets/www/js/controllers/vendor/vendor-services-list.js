vendorView.controller('VendorServicesListCtrl',[
    '$scope',
    '$ionicSlideBoxDelegate',
    '$ionicScrollDelegate',
    '$timeout',
    function(
        $scope,
        $ionicSlideBoxDelegate,
        $ionicScrollDelegate,
        $timeout){
        console.log("controller working");
    $scope.services=[
        {
            name:"Blow dry",
            value:[
            {
                id:"1",
                service:"Variable1 acc to data",
                price:"6000",
                discountprice:"600",
                added:false
            }]
        },{
            name:"Hair dry",
            value:[
            {
                id:"2",
                service:"Variable2 according to data",
                price:"6000",
                discountprice:"600",
                added:false
            },{
                id:"3",
                service:"Variable3 according to data",
                price:"6000",
                discountprice:"600",
                added:false
            },{
                id:"4",
                service:"Variable4 according to data",
                price:"6000",
                discountprice:"600",
                added:false
            }]
        },{
            name:"Hair dry",
            value:[
            {
                id:"5",
                service:"Variable acc to data",
                price:"6000",
                discountprice:"600",
                added:false
            },{
                id:"6",
                service:"Variable acc to data",
                price:"6000",
                discountprice:"600",
                added:false
            }]
        }
    ];


    $scope.selectedServices = {}; // Stores selected services
    $scope.currSlide = 0; // Current slide index

    // Get selected services if previously stored in localstorage
    if (localStorage.getItem("slectedItem") != null) {
        $scope.selectedServices = JSON.parse(localStorage.getItem('slectedItem'));
    }

    // Notify slide change
    // @param (int) slide index
    $scope.slideHasChanged = function(index) {
        $scope.currSlide = $ionicSlideBoxDelegate.currentIndex();
        $timeout( function() {
          $ionicScrollDelegate.$getByHandle('mainScroll').resize();
      },100);
        activeTab(index);

    }

    // notify tab change
    //@param (int) tab click index
    $scope.tabHasChanged = function(index) {
        $ionicSlideBoxDelegate.slide(index);
        activeTab(index);
    }
    // set active tab to different color
    //@param (int) click tab index
    function activeTab(index){

        if(index==0){ // set active to the click tab
        	$('.selected-services-tab').addClass("active");
        	$('.vendor-services-tab').removeClass("active");
        }else{
            $('.selected-services-tab').removeClass("active");
            $('.vendor-services-tab').addClass("active");
        }
    }// activeTab

    // save selected item on click
    //@param1 (int) click item index
    //@param1 (string) click item name
    $scope.selectItem = function(index, serviceName) {
        console.log(index, serviceName);

        // TODO
        // If not already present remove else store the name/id
        if($scope.selectedServices[serviceName]){
            delete $scope.selectedServices[serviceName];
        }else{
            $scope.selectedServices[serviceName] = true;
        }
        localStorage.setItem('slectedItem', JSON.stringify($scope.selectedServices));
    }

    // Scroll tabs to right/left
    // @param (element) button element
    $scope.scrollToRight = function($event) {
        $($event.currentTarget).toggleClass("ion-chevron-right ion-chevron-left");
        if($($event.currentTarget).hasClass("ion-chevron-right")){
            $ionicScrollDelegate.$getByHandle('myhandel').scrollTo(0, 0, true);
        }else{
            $ionicScrollDelegate.$getByHandle('myhandel').scrollTo(500, 0, true);
        }
   }

   // handel back button
   $scope.backButton = function() {
        console.log("Back");
        // TODO
   }

   // handel on click overview button
   $scope.overviewButton = function() {
        console.log("overview");
        // TODO
   }

   
   // handel on click proceed button
   $scope.proceedButton = function() {
        console.log("Proceed");
        // TODO
   }
}])
