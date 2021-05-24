describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/Lab8-1/index.html');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    expect(page.url()).toBe('http://127.0.0.1:5500/Lab8-1/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const headerTitle = await page.$('h1');
    const realOne = await page.evaluate(headerTitle => headerTitle.textContent, headerTitle);
    expect(realOne).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
        const entry = await page.$('entry-page');
        const entryContent = await (await entry.getProperty('entry')).jsonValue();
        
        expect(entryContent.title).toBe('You like jazz?');
        
        expect(entryContent.date).toBe('4/25/2021');
        
        expect(entryContent.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
        
        expect(entryContent.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
        
        expect(entryContent.image.alt).toBe('bee with sunglasses');


  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    const classes = await page.$eval("body");
    const element = await page.evaluate(classes => classes.className, classes);
    expect(element).toBe("single-entry");
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    await page.click('header > img');
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/Lab8-1/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    const header = await page.$eval("header > h1", (h) => {
      return h.innerHTML;
    });
    expect(header).toMatch("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const settings = await page.$eval('body', (set) => {
      return set.classList;
    });
    expect(settings[0]).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/Lab8-1/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async () => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/Lab8-1/index.html');

  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('test12: When the user if on the homepage, the header title should be “Journal Entries”', async () => {
    const header = await page.$('h1');
    const verify = await page.evaluate(header => header.textContent, header);
    expect(verify).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('test13: On the home page the <body> element should not have any class attribute', async () => {
    const body = await page.$('body');
    const verifyBody = await page.evaluate(body => body.className, body);
    expect(verifyBody).toBe('');

  });


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('test14: Verify the url is correct when clicking on the second entry', async () => {
    await page.click('journal-entry:nth-of-type(2)');
    expect(page.url()).toContain('http://127.0.0.1:5500/Lab8-1/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry', async () => {
    const title = await page.$('header > h1');
    const verifyTitle = await page.evaluate(title => title.innerHTML, title);
    expect(verifyTitle).toBe('Entry 2');

  });

  it('Test16: On first Entry page - checking <entry-page> contents', async () => {
    const entry = await page.$('entry-page');
    const entryContents = await (await entry.getProperty('entry')).jsonValue();
    const quote = "Mama always said life was like a box of chocolates. You never know what you're gonna get."
    const imgURL = "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg";
    const otherQuote = "Run, Forrest! Run!";

    expect(entryContents.title).toMatch(otherQuote);
    expect(entryContents.date).toMatch("4/26/2021");
    expect(entryContents.content).toMatch(quote);
    expect(entryContents.image.src).toMatch(imgURL);
    expect(entryContents.image.alt).toMatch("forrest running");
}, 10000);

  // create your own test 17
  it('Test17: Verify the url is correct when clicking on the third entry', async() => {
    await page.click('journal-entry:nth-of-type(3)');
    expect(page.url()).toContain('http://127.0.0.1:5500/#entry3');
  });

  // create your own test 18
  it('Test18: Verify the url is correct when clicking on the fourth entry', async() => {
    await page.click('journal-entry:nth-of-type(4)');
    expect(page.url()).toContain('http://127.0.0.1:5500/#entry4');
  });

  // create your own test 19
  it('test19: Verify the title is current when clicking on the fourth entry', async () => {
    const title = await page.$('header > h1');
    const verifyTitle = await page.evaluate(title => title.innerHTML, title);
    expect(verifyTitle).toBe('Entry 4');

  });

  // create your own test 20
  it('test20: Verify the title is current when clicking on the fifth entry', async () => {
    const title = await page.$('header > h1');
    const verifyTitle = await page.evaluate(title => title.innerHTML, title);
    expect(verifyTitle).toBe('Entry 5');

  });
  
});
