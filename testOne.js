let remote = require('electron').remote;
const { BrowserWindow } = remote
const { exec, spawn } = require('child_process');
const fs = require('fs')
const path = require('path')
let dialog = remote.dialog;
var ConsoleLogHTML = require('console-log-html');
var progress = 20
var timeline1 = '<div class="content"><a class="touchable primary" data-sigil="touchable"><div class="title allowWrap mfsl fcb"><span style="color:red">bad: </span>Implemented logging of capture_session_end in SCPIDCaptureLogger</div></a><div class="subtitle fcg"><a class="touchable primary" data-sigil="touchable"></a><a href="https://our.intern.facebook.com/intern/mobile/buildinfo/buildinfo?build=164520751"> Build 164520751 (07/25/19 11:13)</a></div><div class="preview mfss fcg"><a href="https://phabricator.intern.facebook.com/rFBS7749b193109c071d2e9e1db3a86c04abdb034aae">7749b193109c071d2e9e1db3a86c04</a><div class="subtitle fcg">D16469336 arturwdowiarski</div></div></div>'
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false,
})




$( document ).ready(function() {
    console.log( "ready!" );
});

var dateArray = []
timelineString = "{name: 'Jan 1 2019',date: '2019-01-01'}"
timelineStringTwo = ("[" + timelineString + "]")
var bisectTimeline = eval(timelineStringTwo)
  var canvas = Raphael('timeline', 400, 150);
  jQuery.fn.contentChange = function(callback){
    var elms = jQuery(this);
    elms.each(
      function(i){
        var elm = jQuery(this);
        elm.data("lastContents", elm.html());
        window.watchContentChange = window.watchContentChange ? window.watchContentChange : [];
        window.watchContentChange.push({"element": elm, "callback": callback});
      }
    )
    return elms;
  }
  setInterval(function(){
    if(window.watchContentChange){
      for( i in window.watchContentChange){
        if(window.watchContentChange[i].element.data("lastContents") != window.watchContentChange[i].element.html()){
          window.watchContentChange[i].callback.apply(window.watchContentChange[i].element);
          window.watchContentChange[i].element.data("lastContents", window.watchContentChange[i].element.html())
        };
      }
    }
  },500);

ConsoleLogHTML.connect(document.getElementById("myULContainer"), {}, false, true);

console.log("Estimated steps left: Awaiting Info")
//console.log("Downloading Build 163250091 (08/19/19 13:49)")
//console.log("Downloading Build 163250091 (11/16/19 13:49)")

stepsLeft = $( "li:contains('Estimated')" ).first().text()

$('#myULContainer').contentChange(function(){  
    // fired when a mutation occurs
stepsLeft = $( "li:contains('Estimated')" ).first().text();
 let num = stepsLeft.match(/\d+/);
if (num !== null) {
  progress = num
}
$("h1").text(stepsLeft);

timelineDates = $( "li:contains('Downloading')" ).first().text()

let buildName = timelineDates.substr(12, 15)
 let allDates = timelineDates.substr(29, 8)
 let year = allDates.substr(6, 2)
 let month = allDates.substr(0, 2)
 let day = allDates.substr(3, 2)
 let newDate = ("20" + year + "-" + month + "-" + day)
 let dateConstructor = ("{name: '" + buildName + "',date: '" + newDate + "'}");
 if (dateArray.includes(dateConstructor)){
  
 } else {
  dateArray.push(dateConstructor)
 timelineString = timelineString.concat("," + dateConstructor)
 timelineStringTwo = ("[" + timelineString + "]")
 bisectTimeline = eval(timelineStringTwo)
 //console.log(timelineString)
 canvas.clear()
 canvas.timeline.draw({events: bisectTimeline, color:'#f0f'}, function(product) {
    
  });
}
  //canvas.clearRect(0,0,canvas.width,canvas.height);
  //var canvas = Raphael('timeline', 400, 150);
  
});


$("h1").text(stepsLeft)





//exec('./node_modules/.bin/selenium-standalone start -- -role node -hub http://localhost:4444/grid/register -port 5557', (error, stdout, stderr) => {
//  if (error) {
//    console.error(`exec error: ${error}`);
//    return;
//  }
//  console.log(`Selenium Running`);
//})
//    exec('appium --port 4727', (error, stdout, stderr) => {
//  if (error) {
//    console.error(`${error}`);
//    return;
//  }
//  console.log('Bisect Running')
//  console.log(`${stdout}`);
//  console.log(`${stderr}`);
//})
  let fileTwo = path.join(__dirname, 'configs.json')
  let contentsTwo = '{"webPort": 5557,"simPort": 4727,"app": "/Users/kwilliamson/Downloads/build-x86_64-local-fbobjc-wilde.161283187.ipa","version": 12.2}'
  //let testInfo = ('{ username: "' + userName.value + '", "password: "' + password.value + '", bisectnumber: "' + bisect.value + '", step1: "' + step1Obj.value + '" }');

fs.writeFile(fileTwo, contentsTwo, function(err){
    if (err){
      console.log(err)
    }})
  
        



swalWithBootstrapButtons.fire({
  title: 'Begin Bisect?',
  text: "Is everything correct?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    swalWithBootstrapButtons.fire(
      'Bisecting!',
      'Your bisect has started. To stop, close this window',
      'success'
    )
    testRun = spawn('./node_modules/.bin/wdio');

testRun.stdout.on('data', function (data) {
  console.log(data.toString());
});

testRun.stderr.on('data', function (data) {
  console.log(data.toString());
});

testRun.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString());
});
} else if (
    // Read more about handling dismissals
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'Bisect will not run',
      'error'
    )
  }
})

var colors = new Array(
  [238,130,238],
  [186,85,211],
  [139,0,139],
  [221,160,221],
  [75,0,130],
  [255,0,255]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);