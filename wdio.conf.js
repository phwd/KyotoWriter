const path = require('path')
const fs = require('fs')
var timeout = process.env.DEBUG ? 99999999 : 1000000;
var config = require('./configs.json')

global.downloadDir = path.join(__dirname, 'tempDownload');

function rmdir(dir) {
  var list = fs.readdirSync(dir);
  for(var i = 0; i < list.length; i++) {
    var filename = path.join(dir, list[i]);
    var stat = fs.statSync(filename);

    if(filename == "." || filename == "..") {
      // pass these files
    } else if(stat.isDirectory()) {
      // rmdir recursively
      rmdir(filename);
    } else {
      // rm fiilename
      fs.unlinkSync(filename);
    }
  }
  fs.rmdirSync(dir);
}


exports.config = {
    specs: [
        './tests/**/*.js',
    ],
    suites: {
        testOne: [
            './tests/fbTest.js',
        ],
        testTwo: [
            './tests/fbTest2.js',
        ]},
    exclude: [
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: {
        driver: {
            port: config.simPort,
            desiredCapabilities: {
                app: config.app,
                platformName: "iOS",
                deviceName: "iPhone Simulator",
                automationName: "XCUITest",
                platformVersion: config.version,
                autoAcceptAlerts: true,
                newCommandTimeout: 600
            }
            }
        },
  
    
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'silent',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: './tests/',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 100000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: [],//
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
     reporters: ['dot', 'allure'],

     reporterOptions: {
        allure: {
            outputDir: './reports/allure-results/',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: false
        }
     },
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: timeout
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
     onPrepare: function (config, capabilities) {
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir)
        }
     },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
     beforeSession: function (config, capabilities, specs) {
        chai = require('chai');
        expect = require('chai').expect;
        should = require('chai').should();
     },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: function (capabilities, specs) {

//        var bisectNumber = input.bisectNumber
//        const bisectLink = ('https://m.intern.facebook.com/mobile_builds/bisect/detail_new/?bisect_fbid=' + bisectNumber)
        const path = require('path')
        const fs = require('fs')
        const { URL } = require('url')
        var passFail
        var tasknumber
        var stepOne
        var stepTwo
        var stepThree
        var stepFour
        var stepFive 
        var stepSix
        var stepSeven
        var stepEight 
        var stepNine 
        var stepTen
        var stepEleven  
        var stepTwelve
        var stepThirteen 
        var stepFourteen 
        var stepFifteen 
        var appNumber; 
        var fileName; 
        var filePath;
        var skip;
        var step;
        

                driver.addCommand("checkForAllow", function(customVar) {
            if (driver.isExisting("~Allow") == true) {
                driver.click("~Allow")
            }
        });

                driver.addCommand("checkForOk", function(customVar) {
            if (driver.isExisting("~OK") == true) {
                var okButton = driver.element("~OK");
                okButton.click();
            }
        })
                driver.addCommand("clearAnyNotifs", function(customVar) {
                    driver.checkForOk();
                    driver.checkForAllow();
                    driver.checkForOk();
                    driver.checkForAllow();
                })

                driver.addCommand("mobileLogin", function(customVar) {
            console.log("Logging into app"); 
            driver.pause(3000); 
            driver.clearAnyNotifs();
            driver.clearAnyNotifs();
            if (driver.isExisting("~username-field") == true) {
                console.log("Requires full login"); 
                driver.checkForAllow(); 
                var userName = driver.element("~username-field"); 
                userName.setValue(input.username); 
                var pass = driver.element("~password-field"); 
                pass.setValue(input.password); 
                var lgnBtn = driver.element("~login-button"); 
                lgnBtn.click() 
                driver.pause(10000); 
                driver.checkForAllow(); 
                driver.pause(1000); 
                driver.checkForOk();
                driver.pause(500);
                console.log("Should now be on news feed")
            } else if (driver.isExisting('//XCUIElementTypeApplication[@name="Facebook"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell/XCUIElementTypeOther/XCUIElementTypeOther')) { 
                console.log("Recognizes previous login info"); 
                //driver.checkForAllow(); 
                var account = driver.element('//XCUIElementTypeApplication[@name="Facebook"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell/XCUIElementTypeOther/XCUIElementTypeOther'); 
                account.click(); 
                driver.pause(3000);
                if (driver.isExisting("~password-field")) {
                    console.log("Additional password field")
                    var pass = driver.element("~password-field"); 
                    pass.setValue(input.password); 
                    var lgnBtn = driver.element("~Log In"); 
                    lgnBtn.click() 
                }} else {
                    skip = "yes"
                }
                console.log("Waiting for pop-ups")
                driver.pause(25000); 
                driver.clearAnyNotifs();
                driver.pause(15000);
                driver.clearAnyNotifs();
                if (driver.isExisting("~News Feed")) {
                console.log("Should now be on news feed") 
            } else {
                skip = "yes"
            }
            })

        driver.addCommand("settingsLongPress", function(customVar) {
                    driver.touchAction( "~281710865595635", [
                    'press',
                    { action: 'wait', ms: 8000 },
                    'release'
                    ]);
                })

        driver.addCommand("mobileConfigs", function(customVar) {
            driver.pause(17000)
            driver.clearAnyNotifs();
            driver.clearAnyNotifs();
            driver.clearAnyNotifs();
            driver.settingsLongPress();
            driver.pause(500)
            if (driver.isExisting("~MobileConfig (QE / GK)")) {
            driver.click("~MobileConfig (QE / GK)");
            console.log("Opened mobileconfig page")
            }
            if (driver.isExisting("~MobileConfig")) {
            driver.click("~MobileConfig");
            console.log("Opened mobileconfig page")
            }
            driver.pause(500);
            driver.clearAnyNotifs();
            driver.clearAnyNotifs();
            driver.click("~Import overrides from task");
            driver.pause(500);
            driver.clearAnyNotifs();
            driver.clearAnyNotifs();
            driver.keys(input.tasknumber);
            driver.click("~Import");
            console.log("tapped to import mobileconfigs")
            driver.pause(3000);
            driver.execute("mobile: terminateApp", {"bundleId": 'com.facebook.Wilde'}); 
            driver.execute("mobile: launchApp", {"bundleId": 'com.facebook.Wilde'}); 
            console.log("relaunching")
        });

        
        driver.addCommand("newsFeed", function(customVar) {
            driver.click("~4748854339")
        })

        driver.addCommand("scrollDown", function(customVar) {
            driver.execute('mobile: scroll', {direction: 'down'});
        })

        driver.addCommand("installBisectBuild", function(customVar) {
            driver.execute("mobile: terminateApp", {"bundleId": 'com.facebook.Wilde'}); 
            driver.execute("mobile: removeApp", {"bundleId": 'com.facebook.Wilde'}); 
            driver.execute("mobile: installApp", {"app": filePath}); 
            driver.execute("mobile: launchApp", {"bundleId": 'com.facebook.Wilde'}); 
        })
        driver.addCommand("installBisectBuildIG", function(customVar) {
            driver.execute("mobile: terminateApp", {"bundleId": 'com.burbn.instagram'}); 
            driver.execute("mobile: removeApp", {"bundleId": 'com.burbn.instagram'}); 
            driver.execute("mobile: installApp", {"app": filePath}); 
            driver.execute("mobile: launchApp", {"bundleId": 'com.burbn.instagram'}); 
        })
        driver.addCommand("installBisectBuildMess", function(customVar) {
            driver.execute("mobile: terminateApp", {"bundleId": 'com.facebook.MessengerDev'}); 
            driver.execute("mobile: removeApp", {"bundleId": 'com.facebook.MessengerDev'}); 
            driver.execute("mobile: installApp", {"app": filePath}); 
            driver.execute("mobile: launchApp", {"bundleId": 'com.facebook.MessengerDev'}); 
        })
         driver.addCommand("installBisectBuildWP", function(customVar) {
            driver.execute("mobile: terminateApp", {"bundleId": 'com.facebook.atwork.dev'}); 
            driver.execute("mobile: removeApp", {"bundleId": 'com.facebook.atwork.dev'}); 
            driver.execute("mobile: installApp", {"app": filePath}); 
            driver.execute("mobile: launchApp", {"bundleId": 'com.facebook.atwork.dev'}); 
         })
         driver.addCommand("installBisectBuildWPMess", function(customVar) {
            driver.execute("mobile: terminateApp", {"bundleId": 'com.facebook.workchat.local'}); 
            driver.execute("mobile: removeApp", {"bundleId": 'com.facebook.workchat.local'}); 
            driver.execute("mobile: installApp", {"app": filePath}); 
            driver.execute("mobile: launchApp", {"bundleId": 'com.facebook.workchat.local'}); 
            })

        driver.addCommand("watchTab", function(customVar) {
            if (driver.isExisting("~2392950137")) {
            driver.click("~2392950137"); } else {
                driver.click("~281710865595635");
                driver.pause(3000);
                driver.click("~2392950137-Watch");
            }
            driver.pause(500);
        });

        driver.addCommand("scrollToVideoAndClick", function(customVar) {
            for (i = 0; i < 5; i++) {
                driver.execute('mobile: scroll', {direction: 'down'});
                if (driver.isExisting('~video-player-view-playing') == true) {
                    const elem = driver.$('~video-player-view-playing');
                    console.log("Found a video")
                    elem.click()
                    i = 20;
                }
            }
        })


            driver.addCommand("findChannelPlayerInThisFeed", function(customVar) {
            for (i = 0; i < 20; i++) {
                driver.scrollToVideoAndClick()
                driver.pause(1000)
                if (driver.isExisting('~channel-table') == true) {
                    console.log("Found channel player")
                    i = 20;
                } else {
                    console.log("Not channel player, exiting and searching")
                    if (driver.isExisting('~Close')) {
                        driver.click('~Close');
                        driver.pause(500)} else if 
                        (driver.isExisting('~Info')) {
                            driver.execute("mobile: swipe", {direction: 'up'});
                        } else {
                        driver.execute("mobile: swipe", {direction: 'up'}); 
                        driver.pause(500)};}
                    }});

            driver.addCommand("findChannelPlayer", function(customVar) {
                driver.watchTab();
                driver.findChannelPlayerInThisFeed();
                if (driver.isExisting('~channel-table') == true) {
                    console.log("Found channel player in News Feed");
                } else {
                    driver.newsFeed()
                    driver.click()
                    driver.findChannelPlayerInThisFeed();
                    }});
       
       driver.addCommand("injectedChannelPlayer", function(customVar) {
            driver.watchTab()
            driver.pause(500)
            driver.click("~Video")
            driver.pause(2000)
            if (driver.isExisting("~channel-table")) {
                console.log("You are now on channel feed")
            }
        })

       driver.addCommand("fbLandscape", function(customVar) {
       		try {driver.setOrientation("LANDSCAPE")}
			catch(error) {
 			 console.error(error)}
       	let orientation = driver.getOrientation();
       	console.log(orientation)
       	if (orientation !== "LANDSCAPE") {
       		try {driver.setOrientation("LANDSCAPE")}
			catch(error) {
 			 console.error(error)}
       		let orientation = driver.getOrientation();
       		console.log(orientation)
       		if (orientation !== "LANDSCAPE") {
       		    try {driver.setOrientation("LANDSCAPE")}
					catch(error) {
 			 		console.error(error)}
       				let orientation = driver.getOrientation();
       				console.log(orientation)
       				if (orientation !== "LANDSCAPE") {
       					console.log("Could not landscape app, skipping build")
       				skip = "yes"
       	}
       	}
       	}})

       driver.addCommand("openInjectedVideo", function(customVar) {
       if (driver.isExisting("~Video")) {
        driver.click("~Video")
        console.log("Opening video")
        } else {
        driver.scrollDown()
        console.log("Scrolling to video")
        if (driver.isExisting("~Video")) {
                    driver.click("~Video")
                    console.log("Opening video")
                    driver.pause(2000); 
        } else {
            skip = "yes";
            console.log("video didn't load, skipping")}}
        });

       driver.addCommand("fbUrl", function(customVar) {
            driver.pause(15000)
            driver.clearAnyNotifs();
            driver.clearAnyNotifs();
            driver.clearAnyNotifs();
            driver.settingsLongPress();
            if (driver.isExisting("~Test In-App URL")) {
                driver.click("~Test In-App URL")
            } else if (driver.isExisting("~Development Tools")) {
                console.log("internal settings option not pinned, opening dev tools")
                driver.click("~Development Tools")
                driver.pause(500)
                driver.scrollDown()
                driver.scrollDown()
                driver.click("~Test In-App URL")
            } else {
                console.log("no way to reach destination, skipping")
                skip = "yes"
            }
            driver.pause(3000)
        })

            driver.addCommand("watchParty", function(customVar) {
                driver.fbUrl()
                driver.keys("fb://group?id=146620542735905" + "\n")
                console.log("should now be in Videos Pod group")
                driver.pause(500)
                driver.scrollToVideoAndClick()
                driver.pause(5000)
            })

                driver.addCommand("groupTest", function(customVar) {
                driver.fbUrl()
                driver.keys("fb://group?id=bopbopbop" + "\n")
                console.log("should now be in Bop Bop Bop group")
                driver.pause(5000)
            })


//        var bisectNumber = input.bisectnumber; const bisectLink = ('https://m.intern.facebook.com/mobile_builds/bisect/detail_new/?bisect_fbid=' + bisectNumber); const passFail = (input.should + "('" + input.element + "')"); const tasknumber = input.tasknumber; const stepOne = input.step1; const stepTwo = input.step2; const stepThree = input.step3; const stepFour = input.step4; const stepFive = input.step5; const stepSix = input.step6; const stepSeven = input.step7; const stepEight = input.step8; const stepNine = input.step9; const stepTen = input.step10; const stepEleven = input.step11; const stepTwelve = input.step12; const stepThirteen = input.step13; const stepFourteen = input.step14; const stepFifteen = input.step15; var appNumber; var fileName; var filePath;
//         
//            describe("Runs a Bisect", function() {it("logs into tool", function() { chromeBrowser.bisectToolLogin()}); var step; for (step= 0; step <25; step++) {it("- with the recommended build", function(done) { chromeBrowser.grabBisectBuild(); driver.installBisectBuild()}); it("- runs custom steps", function(done) { console.log("Running custom steps"); driver.customSteps()}); it("- clicks good or bad based on an element in the app", function(done) {
//            if (eval(passFail)) {
//                chromeBrowser.click("/html//div[@id='root']//form[@action='/mobile_builds/bisect/step_new/']/table[@class='btnBar']//tr/td[1]/button[@name='test_result']")
//            } else {
//                chromeBrowser.click("/html//div[@id='root']//form[@action='/mobile_builds/bisect/step_new/']/table[@class='btnBar']//tr/td[2]/button[@name='test_result']")
//            }
//        })
//    }
//})
 //     }



     },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
     //beforeCommand: function (commandName, args) { driver.clearAnyNotifs();
     //},
    
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // beforeTest: function (test) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function () {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function () {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     * @param {Object} test test details
     */
    // afterTest: function (test) {
    // },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
     onComplete: function(exitCode, config, capabilities) {
        rmdir(downloadDir)
     }
}
