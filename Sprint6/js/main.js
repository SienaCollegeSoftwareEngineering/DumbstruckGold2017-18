angular.module('DumbstruckApp', [])
    .controller('MainCtrl', ['$scope', '$q', func]);

//Graph variables
    var gender = {
        numMales : 1,
        numFemales : 1
    };
    var ages = {
        age02 : 1,
        age37 : 1,
        age812 : 1,
        age1319 : 1,
        age2036 : 1,
        age3765 : 1,
        age66 : 1
    };
    var ethnicities = {
        numCauc : 1,
        numHisp : 1,
        numAfrc : 1,
        numAsia : 1
    };

function func($scope, $q){
$scope.numPeople = 0;
    
// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var canvas = window.canvas = document.getElementById('pictureTaken');
canvas.width = 480;
canvas.height = 360;
$scope.start = false;
var button = document.querySelector('#takeSnapshotBtn');
var timer = 0;
button.onclick = function(){
  $scope.start = !$scope.start;
    $scope.$apply();
  if($scope.start){
    timer = setInterval(startVideo, 3000);
      button.innerHTML = "Stop Recording";
  }
  else {
    clearInterval(timer);
    button.innerHTML = "Start Recording"
  }
};
    
function startVideo(){
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').
    drawImage(video, 0, 0, canvas.width, canvas.height);
    $scope.sendPicture();
};    
    
var constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}
    
    $scope.sendPicture = function () {
       // console.log('sending picture');
    var photo = document.getElementById('pictureTaken');
    var canvas = document.createElement('canvas');
    canvas.width = photo.width;
    canvas.height = photo.height;
    canvas.getContext('2d').drawImage(photo, 0, 0);
    var url = photo.src;
    //var base64Data = url.substr(url.indexOf(',') + 1);
    $scope.imageUrl = canvas.toDataURL("image/jpeg", 1.0);
    var base64Data = $scope.imageUrl.substr($scope.imageUrl.indexOf(',')+1);
    $scope.analyzeImage(base64Data, $q);
  }

$scope.analyzeImage = function (base64Image, $q) {
  var API_SERVER = "https://test-api.dumbstruck.com/v1";
  var API_KEY = "Ob0b3ozGMr2LR8N0G98nt9m68X8ZTLR693I8yo1A";

  var promise = $q.defer();

  var jsonBody = {
    "base64Image": base64Image
  }

  var params = {
    "attention": false,
    "emotions": true,
    "age": true,
    "gender": true,
    "ethnicity": true,
    "landmarks": false
  }

  $.ajax({
    type: "POST",
    url: API_SERVER + '/analyze/image?' + $.param(params),
    data: JSON.stringify(jsonBody),
    success: function (data) {
      promise.resolve(data);
      console.log('Success');
      $scope.readJSON(data);
      console.log("data",data);
      
    },
    error: function (data) {
      promise.reject(data);
      console.log('Error');
      console.log(data);
    },
    dataType: "json",
    contentType: "application/json",
    headers: {
      "X-Api-Key": API_KEY
    }
  });

  return promise.promise;
};

$scope.readJSON = function(data){
    $scope.numPeople = data.exposures.length;
    $scope.$apply();
    var genderNew = {
        numMales : 0,
        numFemales : 0
    };
    var agesNew = {
        age02 : 0,
        age37 : 0,
        age812 : 0,
        age1319 : 0,
        age2036 : 0,
        age3765 : 0,
        age66 : 0
    };
    var ethnicitiesNew = {
        numCauc : 0,
        numHisp : 0,
        numAfrc : 0,
        numAsia : 0
    };
    for (var i = 0; i < $scope.numPeople; i++){
        if (data.exposures[i].predictions[0].observations[0].focus.name =="Male"){
            genderNew.numMales++;
        }else{
            genderNew.numFemales++;
        }
        ageGuess = data.exposures[i].predictions[1].observations[0].focus.name;
        if(ageGuess == "0-2"){
            agesNew.age02++;
        }else if(ageGuess == "3-7"){
            agesNew.age37++;
        }else if(ageGuess == "8-12"){
            agesNew.age812++;
        }else if(ageGuess == "13-19"){
            agesNew.age1319++;
        }else if(ageGuess == "20-36"){
            agesNew.age2036++;
        }else if(ageGuess == "37-65"){
            agesNew.age3765++;
        }else if(ageGuess == "66+"){
            agesNew.age66++;
        }
        ethnGuess = data.exposures[i].predictions[3].observations[1].focus.name;
        if(ethnGuess == "Caucasian"){
            ethnicitiesNew.numCauc++;
        }else if(ethnGuess == "Hispanic"){
            ethnicitiesNew.numHisp++;
        }else if(ethnGuess == "African"){
            ethnicitiesNew.numAfrc++;
        }else if(ethnGuess == "Asian"){
            ethnicitiesNew.numAsia++;
        }
    }
    gender = genderNew;
    ages = agesNew;
    ethnicities = ethnicitiesNew;
    
    bakePies();
};    
    
navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);

}

