let remote = require('electron').remote;
const { BrowserWindow, app } = remote
const { exec, spawn } = require('child_process');
const fs = require('fs')
const path = require('path')
let dialog = remote.dialog;
var ConsoleLogHTML = require('console-log-html');
const fixPath = require('fix-path');

$( document ).ready(function() {
    console.log( "ready!" )})

    ConsoleLogHTML.connect(document.getElementById("myULContainer"), {}, false, true);
    fixPath();

    exec((app.getAppPath() + '/node_modules/selenium-standalone/bin/selenium-standalone start -- -role node -hub http://localhost:4444/grid/register -port 5560'), (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`Selenium Running`);
})
    exec('appium --port 4730', (error, stdout, stderr) => {
  if (error) {
    console.error(`${error}`);
    return;
  }
  console.log('Appium Running')
  console.log(`${stdout}`);
  console.log(`${stderr}`);
})