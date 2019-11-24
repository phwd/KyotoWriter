# KyotoWriter
## A custom built automation scriptwriter used internally by Facebook to allow non-coders to build Automation Tests

![Image of Kyoto](https://i.ibb.co/8sJxHw1/Screen-Shot-2019-11-24-at-3-09-16-PM.png)

### Originally created for the purpose of automating the Bisect process within facebook to shorten the time of a bisect from 2 hours to 10 minutes, this tool has been streamlined for the purpose of specifically writing app automation tests for use in any type of WebdriverIO automation flow.

![Image of Kyoto Dropdowns](https://i.ibb.co/yfLLMLD/Screen-Shot-2019-11-24-at-3-09-31-PM.png)

### By creating pre-programmed paths to various surfaces within facebook, end users no longer have to manually write the code to reach these surfaces with each test. These dropdowns have already been crosschecked across all versions of facebook released within the past year.

![Image of Kyoto Custom Steps](https://i.ibb.co/LdLK2Gw/Screen-Shot-2019-11-24-at-3-10-01-PM.png)

### When there is a need to run new code, the appium test recorder can be used to capture that code to be copied and pasted into the custom steps input fields within the test writer.

![Image of Kyoto Custom Steps](https://i.ibb.co/84R7zDC/Screen-Shot-2019-11-24-at-3-10-16-PM.png)

### Test assertions are generated in the last section of the step writer. Here you can input the Accessibility ID or XPath location of the element you need to verify. The dropdown next to this has options for whether or not that element should or should not appear, be visible, where it should be located, and what the size of the element should be. There is also a hub of servers available here, each of which opens up a new combination of Appium and Selenium servers. This allows for the secondary test flow programs, such as the full bisect runner, to utilize those servers.
