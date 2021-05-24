# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)  
Answer: A (or #1)    
(Within a Github action that runs whenever code is pushed)

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.  
Answer: No. The feature does multiple things like write and send and there seems to be a lot that would be going on. Unit tests are for debugging on a small scale, and this is not small scale.  

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters  

Answer: Yes. Testing the max length is something you can test on a small scale, and you could just do a unit test to see if the user is able to type after 80 characters or not. It's not as complicated as an entire system or feature like before.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?  

Answer: The tests run without a browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
  
Answer: `await page.click('header > img')`