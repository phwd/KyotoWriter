
//var mC = ("44237413")



module.exports = { checkForAllow,
		checkForOk,
		fbMobileLogin,
		mobileConfigs,
		scrollToVideoAndClick };

driver.addCommand("checkForAllow", function(customVar) {
			if (driver.isExisting("~Allow") == true) {
			var allowButton = driver.element("~Allow");
			allowButton.click();
		}
})

driver.addCommand("checkForOk", function(customVar) {
			if (driver.isExisting("~OK") == true) {
			var okButton = driver.element("~OK");
			okButton.click();
		}
})


driver.addCommand("mobileLogin", function(customVar) {

	var userName = driver.$("~username-field")
		driver.pause(3000)
	if (userName.isExisting() == true) {
		driver.checkForAllow();
		userName.setValue("5126564852");
		var el2 = driver.element("~password-field");
		el2.setValue("kniveschau");
		var el3 = driver.element("~login-button");
		el3.click();
		driver.pause(5000)
		driver.checkForAllow()
		driver.pause(1000)
		driver.checkForOk()
	} else {
		driver.checkForAllow();
		var el1 = driver.element('//XCUIElementTypeApplication[@name=\"Facebook\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell/XCUIElementTypeOther/XCUIElementTypeOther');
		el1.click();
		driver.pause(2000)
		if (driver.isExisting("~password-field") == true) {
			var el2 = driver.element("~password-field");
			el2.setValue("kniveschau");
			var el3 = driver.element("~Log In");
			el1.click();
		}
		driver.pause(5000)
		if (driver.isExisting('(//XCUIElementTypeButton[@name="OK"])[2]' == true)) {
			var el4 = driver.element('(//XCUIElementTypeButton[@name="OK"])[2]');
			el4.click();
		}
		driver.checkForAllow();
		driver.checkForAllow();
		driver.checkForOk()
	}
	driver.pause(5000)
	driver.checkForAllow()
	driver.pause(2000)
	driver.checkForOk()
})

driver.addCommand("mobileConfigs", function(customVar) {
	driver.checkForAllow()
	driver.pause(1000)
	var hamburger = driver.$("~281710865595635")
	hamburger.click()
	driver.pause(2000)
	driver.execute('mobile: scroll', {direction: 'down'});
	driver.execute('mobile: scroll', {direction: 'down'});
	driver.execute('mobile: scroll', {direction: 'down'});
	var settings = driver.$("~Setting & Privacy")
	settings.click()
	driver.pause(2000)
	var internal = driver.$("~internalSettings-Internal Settings")
	internal.click()
	driver.pause(2000)
	var configs = ("~MobileConfig (QE / GK)")
	configs.click()
	driver.pause(2000)
	var overrides = ("~Import overrides from task")
	overrides.click()
	driver.pause(2000)
	driver.$('//XCUIElementTypeAlert[@name="Import Overrides"]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField').setValue(mC)
	var relogin = driver.$("~Yes, relogin now!")
	relogin.click()
	driver.launch()
})
//})


driver.addCommand("scrollToVideoAndClick", function(customVar) {
	var set = false;
	var scrollWhile = 0;
	driver.checkForAllow()
		if (driver.isExisting('~video-player-view-playing') == true) {
	} else {
		while (scrollWhile < 25) {
		scrollWhile++;
		driver.execute('mobile: scroll', {direction: 'down'});
			if (driver.isExisting('~video-player-view-playing') == true) {
				if (driver.isExisting('~sponsored') == true) {
					continue
				} else {
					break
				}
			}
		}
		var video = driver.$('~video-player-view-playing')
		video.click()
	}
	});

//	var video = driver.element("~video");
//	video.click();
//	})//

describe("logs in", function() {
	it("checks for login type", function() {
		driver.fbMobileLogin()
	})
	//it("scrolls through feed and clicks video", function() {
		//driver.pause(5000)
		//driver.checkForAllow()
		//driver.mobileConfigs()
		//driver.scrollToVideoAndClick()
		driver.pause(5000)
	//})
})







