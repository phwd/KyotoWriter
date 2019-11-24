
//const {execPath} = require('./app/binaries');
let remote = require('electron').remote;
const { BrowserWindow, app } = remote
const { spawn, exec } = require('child_process');
//var command = spawn(execPath, arg, {});
//var execCommand = exec(execPath, arg, {});
const fs = require('fs')
const path = require('path')
let dialog = remote.dialog;
const fixPath = require('fix-path');
 

//var ConsoleLogHTML = require('console-log-html');

$( document ).ready(function() {
    console.log( "ready!" );
});


btnSave = document.getElementById('btnSave')
btnSettings = document.getElementById('btnSettings')
btnOpen = document.getElementById('btnOpen')
userName = document.getElementById('username')
userNameObj = userName.value
password = document.getElementById('password')
passwordObj = password.value
bisect = document.getElementById('bisectnumber')
bisectObj = bisect.value
task = document.getElementById('tasknumber')
taskObj = task.value
element = document.getElementById('element')
elementObj = element.value
step1 = document.getElementById('step1')
step1Obj = step1.options[step1.selectedIndex]
testTry = document.getElementById('newTest')
var counter = 2;
var commands = ('<option value="driver.mobileLogin();"> Log in with my username/password (ends up on facebook feed) </option><option value="driver.mobileConfigs();"> Import MobileConfigs (requires task number to be filled in) </option><option value="driver.checkForAllow();"> Check to make sure save login info notification is gone (notification blocks further action) </option><option value="driver.scrollDown();"> Scroll down one page length </option><option value="driver.openInjectedVideo();"> Open Injected Video </option><option value="driver.clearAnyNotifs();"> Clear any notifications </option><option value="driver.newsFeed();"> Return to newsfeed (button must be visible in nav menu) </option><option value="driver.watchTab();"> Open Watch Tab (button must be visible in nav menu)</option>')
const projectDir = app.getAppPath()
//var newStep = $('<div id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><select class="form-control" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')



$('#step1').append(commands)
fixPath();

//step2 = document.getElementById('step2').getAttribute("value")
ConsoleLogHTML.connect(document.getElementById("myULContainer"), {}, false, true);

        exec((app.getAppPath() + '/node_modules/selenium-standalone/bin/selenium-standalone start'),{
    maxBuffer: 2000 * 1024 //quick fix
    }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Selenium Error: ${error}`);
    return;
  }
  console.log(`selenium: ${stdout}`);
  console.log(`selenium: ${stderr}`);
})

    exec(('appium &'),{
    maxBuffer: 2000 * 1024 //quick fix
    }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Appium Error: ${error}`);
    return;
  }
  console.log(`appium: ${stdout}`);
  console.log(`appium: ${stderr}`);
})

btnAddStep.addEventListener('click', function(){
if(counter>15){
            alert("Only 15 steps allowed");
            return false;
    }   

    var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')

    newStep.appendTo('#StepCont')
    $('#StepDiv' + counter).addClass('animated zoomIn')
    //$('#StepDiv' + counter).slideDown("slow");
   // function(){
   // newStep.appendTo('#StepDiv' + counter)
    //}



    counter++;
     });

btnAddCstmStep.addEventListener('click', function(){
if(counter>15){
            alert("Only 15 steps allowed");
            return false;
    }   

    var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '"></textarea></div>')

    newStep.appendTo('#StepCont')
    $('#StepDiv' + counter).addClass('animated zoomIn')
    //$('#StepDiv' + counter).slideDown("slow");
   // function(){
   // newStep.appendTo('#StepDiv' + counter)
    //}



    counter++;
     });

     $("#btnRmvStep").click(function () {
    if(counter==1){
          alert("No more steps to remove");
          return false;
       }   

    counter--;
        $('#StepDiv' + counter).addClass('animated zoomOut')
        setTimeout(function () {
        $('#StepDiv' + counter).remove()
      }, 300);

     });

  $("#btnSeeData").click(function () {
    dataForm = $('form').serializeJSON()
    alert(JSON.stringify(dataForm))
  })


//function(){
//  $('#newstep').append(commands)
//}





fileContents = "hello"

//let pathName = path.join(__dirname, 'Files')

btnSave.addEventListener('click', function(){
  //let testInfo = ('{ username: "' + userName.value + '", "password: "' + password.value + '", bisectnumber: "' + bisect.value + '", step1: "' + step1Obj.value + '" }');
  dialog.showSaveDialog({ defaultPath: 'Bisect Name'}, (filepath) => {
    var pathName = filepath;
    dataForm = $('form').serializeJSON()
    let file = pathName
    let contents = JSON.stringify(dataForm)
    fs.writeFile(file, contents, function(err){
    if (err){
     Swal.fire({
  title: 'Error!',
  text: err,
  type: 'error',
  confirmButtonText: 'Ok'
})
    } else {
         Swal.fire({
  title: 'Success!',
  text: "Test Saved!",
  type: 'success',
  showConfirmButton: false,
  timer: '1000'
})}
  })
  })
})

btnOpen.addEventListener('click', function(){
  dialog.showOpenDialog({ defaultPath: 'Bisect Name'}, (filepath) => {
    var pathName = String(filepath);
    let fileValue = pathName.value;
    let file = pathName
    fs.readFile(pathName, function(err, data){
      if(err) {
             Swal.fire({
          title: 'Error!',
          text: err,
          type: 'error',
         confirmButtonText: 'Ok'
})} else {
         Swal.fire({
  title: 'Success!',
  text: "Test Loaded",
  type: 'success',
  showConfirmButton: false,
  timer: '1000'
})  
}
      
      dataObject = JSON.parse(data)
      userName.value = dataObject.username
      password.value = dataObject.password
      bisect.value = dataObject.bisectnumber
      element.value = dataObject.element
      tasknumber.value = dataObject.tasknumber
      lookfor.value = dataObject.lookfor
      stepOne = dataObject.step1
      stepTwo = dataObject.step2
      stepThree = dataObject.step3
      stepFour = dataObject.step4
      stepFive = dataObject.step5
      stepSix = dataObject.step6
      stepSeven = dataObject.step7
      stepEight = dataObject.step8
      stepNine = dataObject.step9
      stepTen = dataObject.step10
      function setSelectValue (id, val) {
        document.getElementById(id).value = val;
      }
      setSelectValue('should', dataObject.should)
      //savedSteps = JSON.parse((data.startsWith('step'))
        //console.log(savedSteps)
      $( ".steps" ).remove()
      counter = 1
        if(stepOne !== undefined) {
              if ($.inArray(stepOne, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step1', dataObject.step1)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepOne + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
         if(stepTwo !== undefined) {
              if ($.inArray(stepTwo, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step2', dataObject.step2)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepTwo + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
         if(stepThree !== undefined) {
              if ($.inArray(stepThree, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step3', dataObject.step3)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepThree + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
        if(stepFour !== undefined) {
              if ($.inArray(stepFour, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step4', dataObject.step4)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepFour + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
        if(stepFive !== undefined) {
              if ($.inArray(stepFive, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step5', dataObject.step5)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepFive + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
        if(stepSix !== undefined) {
              if ($.inArray(stepSix, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step6', dataObject.step6)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepSix + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
        if(stepSeven !== undefined) {
               if ($.inArray(stepSeven, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step7', dataObject.step7)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepSeven + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
        if(stepEight !== undefined) {
               if ($.inArray(stepEight, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step8', dataObject.step8)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepEight + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
        if(stepNine !== undefined) {
                if ($.inArray(stepNine, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step9', dataObject.step9)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepNine + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
        if(stepTen !== undefined) {
                if ($.inArray(stepTen, ["driver.mobileLogin();", "driver.mobileConfigs();", "driver.checkForAllow();", "driver.scrollDown();", "driver.openInjectedVideo();"]) >= 0) {

              var newStep = $('<div class="steps" id=StepDiv' + counter + '><label class="steps" for="step' + counter + '">Step ' + counter + '</label><select class="form-control steps" id="step' + counter + '" name="step' + counter + '">' + commands + '</select></div>')
              newStep.appendTo('#StepCont')
              setSelectValue('step10', dataObject.step10)
            }
              else {
                var newStep = $('<div class="steps" id=StepDiv' + counter + '><label for="step' + counter + '">Step ' + counter + '</label><textarea rows="2" class="form-control" id="step' + counter + '" name="step' + counter + '">' + stepTen + '</textarea></div>')
              newStep.appendTo('#StepCont')
              }
              counter++
        }
      }
    )


      
    })
})

btnSingleTest.addEventListener('click', function() {
  let file = (app.getAppPath() + "/tests/fbTest.js")
        let one = ("bisectNumber = input.bisectnumber; bisectLink = ('https://m.intern.facebook.com/mobile_builds/bisect/detail_new/?bisect_fbid=' + bisectNumber); var passFail = (input.should + " + '"' + "('" + '"' + " + input.element + " + '"' + "')" + '"' + "); if (input.should === " + '"' + "gettext" + '"' + ") {passFail = (" + '"' + "driver.$('" + '"' + " + input.element + " + '"' + "').getText() === input.lookfor" + '"' + ")}; if (input.should === " + '"' + "getlocation" + '"' + ") {passFail = (" + '"' + "JSON.stringify(driver.$('" + '"' + " + input.element + " + '"' + "').getLocation()) === input.lookfor" + '"' + ") }; if (input.should === " + '"' + "getsize" + '"' + ") {passFail = (" + '"' + "JSON.stringify(driver.getElementSize('" + '"' + " + input.element + " + '"' + "')) === input.lookfor" + '"' + ") };tasknumber = input.tasknumber; stepOne = input.step1; stepTwo = input.step2; stepThree = input.step3; stepFour = input.step4; stepFive = input.step5; stepSix = input.step6; stepSeven = input.step7; stepEight = input.step8; stepNine = input.step9; stepTen = input.step10; stepEleven = input.step11; stepTwelve = input.step12; stepThirteen = input.step13; stepFourteen = input.step14; stepFifteen = input.step15;")
        let cstmCmd = ("driver.addCommand('customSteps', function(customVar) {if(stepOne !== undefined) {eval(stepOne)}; if(stepTwo !== undefined) {eval(stepTwo)}; if(stepThree !== undefined) {eval(stepThree)}; if(stepFour !== undefined) {eval(stepFour)}; if(stepFive !== undefined) {eval(stepFive)}; if(stepSix !== undefined) {eval(stepSix)}; if(stepSeven !== undefined) {eval(stepSeven)}; if(stepEight !== undefined) {eval(stepEight)}; if(stepNine !== undefined) {eval(stepNine)}; if(stepTen !== undefined) {eval(stepTen)}; if(stepEleven !== undefined) {eval(stepEleven)}; if(stepTwelve !== undefined) {eval(stepTwelve)}; if(stepThirteen !== undefined) {eval(stepThirteen)}; if(stepFourteen !== undefined) {eval(stepFourteen)}; if(stepFifteen !== undefined) {eval(stepFifteen)}});")
 //     let four = (" function checkExistsWithTimeout(filePath, timeout) {return new Promise(function (resolve, reject) {  var timer = setTimeout(function () {watcher.close(); reject(new Error('File did not exists and was not created during the timeout.'))}, timeout); fs.access(filePath, fs.constants.R_OK, function (err) {if (!err) {clearTimeout(timer); watcher.close(); resolve()}}); var dir = path.dirname(filePath); var basename = path.basename(filePath); var watcher = fs.watch(dir, function (eventType, filename) {if (eventType === 'rename' && filename === basename) {clearTimeout(timer); watcher.close(); resolve()}})})};")
      let five = (' describe("Get Past Auth", function() {')
      let six = (' it("- runs custom steps", function(done) {console.log("Running custom steps"); driver.customSteps()}); it("- clicks good or bad based on an element in the app", function(done) {if (eval(passFail)) {console.log("Good Build!")} else {console.log("Bad Build :' + "'" + '(")}})})')
      let dataForm = $('form').serializeJSON()
      let bisectRun = ("input = " + JSON.stringify(dataForm) + "; " + one + cstmCmd + five + six)
      let contents = bisectRun

//  exec('./node_modules/.bin/selenium-standalone start', (error, stdout, stderr) => {
//  if (error) {
//    console.error(`exec error: ${error}`);
//    return;
//  }
//  console.log(`${stdout}`);
//  console.log(`${stderr}`);
//})
fs.writeFile(file, contents, function(err){
    if (err){
      return console.log(err)
    } else {
    testRun = spawn('node_modules/webdriverio/bin/wdio', { cwd: projectDir });

testRun.stdout.on('data', function (data) {
  console.log(data.toString());
});

testRun.stderr.on('data', function (data) {
  console.log(data.toString());
});

testRun.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString());
});
}
})
})

//        var console = {};//

//        // Getting div to insert logs
//        var logger = document.getElementById("userconsole");//

//        // Adding log method from our console object
//        console.log = function(text)
//        {
//            var element = document.createElement("div");
//            var txt = document.createTextNode(text);//

//            logger.appendChild(txt);
//        }

//window.open('https://m.intern.facebook.com/mobile_builds/bisect/detail_new/?bisect_fbid=' + bisectObj)

btnSettings.addEventListener('click', function() {
  let fileTwo = path.join(app.getAppPath(), 'configs.json')
dialog.showOpenDialog({ defaultPath: 'Bisect Name'}, (filepath) => {
    var pathName = String(filepath);
    contentsTwo = ('{"webPort": 4444,"simPort": 4723,"app": "' + pathName + '","version": 12.1}')
          fs.writeFile(fileTwo, contentsTwo, function(err){
    if (err){
      console.log(err)
    }})})})



btnServerOne.addEventListener('click', function() {

let win = new BrowserWindow({ width: 400, height: 200, webPreferences: {nodeIntegration: true}})
win.on('closed', () => {
  win = null
})

win.loadURL('file://' + __dirname + '/testoneserver.html')

})

btnServerTwo.addEventListener('click', function() {

let win = new BrowserWindow({ width: 400, height: 200, webPreferences: {nodeIntegration: true}})
win.on('closed', () => {
  win = null
})

win.loadURL('file://' + __dirname + '/testtwoserver.html')

})

btnServerThree.addEventListener('click', function() {

let win = new BrowserWindow({ width: 400, height: 200, webPreferences: {nodeIntegration: true}})
win.on('closed', () => {
  win = null
})

win.loadURL('file://' + __dirname + '/testthreeserver.html')

})




//  spawn('./node_modules/.bin/wdio', (error, stdout, stderr) => {
//  if (error) {
//    console.error(`exec error: ${error} ${stdout}`);
//    return;
//  }
//  console.log(`stdout: ${stdout}`);
//  console.log(`stderr: ${stderr}`);
//})
