import HCCrawler from 'headless-chrome-crawler';

Meteor.methods({
  crawler1: function() {
    console.log('crawler1 launched');

    (async () => {
      let c = Crawlers.findOne()
      let fct = new Function(c.functionToExecute)
      let startURL = c.startURL[0]

      const crawler = await HCCrawler.launch({
        evaluatePage: (fct),
        onSuccess: (result => {
          try {
            console.log('GOOD:',result.result);
          } catch (e) {
            console.log('result full', result);
          }
        }),
        onError: (error => {
          console.log(error);
        }),
      });

//      await crawler.queue('http://www.whatsmyip.org/');       // Queue a request

      await crawler.queue({    // Queue a request with custom options
        url: startURL,
        device: 'Nexus 7',
        screenshot: {
          path: '../../../../../public/img/screenshot/lastscreenshot.png'
        },
      });

      await crawler.onIdle(); // Resolved when no queue is left
      await crawler.close(); // Close the crawler
      console.log('crawler1 finished');
    })();

  }
});
