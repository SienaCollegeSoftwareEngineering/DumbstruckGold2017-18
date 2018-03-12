angular.module('DumbstruckApp', [])
    .controller('MainCtrl', ['$scope', '$q', func]);
function func($scope, $q){
    
// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var canvas = window.canvas = document.getElementById('pictureTaken');
canvas.width = 480;
canvas.height = 360;
var start = false;
var button = document.querySelector('#takeSnapshotBtn');
var timer = 0;
button.onclick = function(){
  start = !start;
  if(start){
    timer = setInterval(startVideo, 200);
  }
  else {
    clearInterval(timer);
  }
};
    
function startVideo(){
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').
    drawImage(video, 0, 0, canvas.width, canvas.height);
    $scope.sendPicture();
};
//Graph variables
    var numMales = 0
    var numFemales = 0
    var ages = {
        age02 : 0,
        age37 : 0,
        age812 : 0,
        age1319 : 0,
        age2036 : 0,
        age3765 : 0,
        age66 : 0
    };
    var ethnicities = {
        numCauc : 0,
        numHisp : 0,
        numAfrc : 0,
        numAsia : 0
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
        console.log('sending picture');
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
    "attention": true,
    "emotions": true,
    "age": true,
    "gender": true,
    "ethnicity": true,
    "landmarks": true
  }

  $.ajax({
    type: "POST",
    url: API_SERVER + '/analyze/image?' + $.param(params),
    data: JSON.stringify(jsonBody),
    success: function (data) {
      promise.resolve(data);
      console.log('Success');
      readJSON(data);
      console.log("data",data);
      console.log("promise",promise);
      
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

function readJSON(data){
    var numpeople = data.length;
    numMales = 0;
    numFemales = 0;
    ages.age02 = 0;
    ages.age37 = 0;
    ages.age812 = 0;
    ages.age1319 = 0;
    ages.age2036 = 0;
    ages.age3765 = 0;
    ages.age66 = 0;
    ethnicities.numCauc = 0;
    ethnicities.numHisp = 0;
    ethnicities.numAfrc = 0;
    ethnicities.numAsia = 0;
    for (var i = 0; i < numPeople; i++){
        if (data.exposures[i].predictions[0].observations[0].focus.name =="Male"){
            numMales++;
        }else{
            numFemales++;
        }
        ageGuess = data.exposures[i].predictions[1].observations[0].focus.name;
        if(ageGuess == "0-2"){
            ages.age02++;
        }else if(ageGuess == "3-7"){
            ages.age37++;
        }else if(ageGuess == "8-12"){
            ages.age812++;
        }else if(ageGuess == "13-19"){
            ages.age1319++;
        }else if(ageGuess == "20-36"){
            ages.age2036++;
        }else if(ageGuess == "37-65"){
            ages.age3765++;
        }else if(ageGuess == "66+"){
            ages.age66++;
        }
        ethnGuess = data.exposures[i].predictions[3].observatopms[1].focus.name;
        if(ethnGuess == "Caucasian"){
            ethnicities.numCauc++;
        }else if(ethnGuess == "Hispanic"){
            ethnicities.numHisp++;
        }else if(ethnGuess == "African"){
            ethnicities.numAfrc++;
        }else if(ethnGuess == "Asian"){
            ethnicities.numAsia++;
        }
    }
};    
    
navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);

}

