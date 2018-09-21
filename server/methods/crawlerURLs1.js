import HCCrawler from 'headless-chrome-crawler';
import proxyChain from 'proxy-chain';
import { Random } from 'meteor/random'

Meteor.methods({
  crawlerURL1: function(obj) {
    console.log('crawlerURL1 launched',obj);
    let crawlID = Random.id();
    console.log('crawl ID:',crawlID);



    //configuration for the crawler
    let urls = []
    if (obj.oneOrall === 'one') {
      urls = Starturls.find({crawlerID:obj._id}, {limit :1}).fetch()
    } else {
      urls = Starturls.find({crawlerID:obj._id}).fetch()
    }

    let c = Crawlers.findOne({_id:obj._id})
    Crawlers.update({_id:obj._id}, { $set: {status:'Running'} })

    let bindInsert = Meteor.bindEnvironment(function (crawlerID,crawlID,result,fullResult,URL_crawled){
        Resulturls.insert({
          crawlerID:crawlerID,
          crawlID:crawlID,
          result:result,
          fullResult:fullResult,
          URL_crawled:URL_crawled
        })
      },
      function(e){throw e;}
    );

    //ici on verifie que les mots interdit ne sont pas presents:
    if (/(import)|(require)/g.test(c.functionToExecute)) {
      bindInsert(obj._id,crawlID,{error:'use of forbidden word like import, require...'},{'error':'incorrect function provided'},'http://no_url.com')
      Crawlers.update({_id:obj._id}, { $set: {status:'Ready'} })
      return false
    }


    let urlsArray = []
    for (var i = 0; i < urls.length; i++) {      urlsArray.push(urls[i].URL)    }



    (async () => {
      let newProxyUrl;
      let proxyServerIdAndAddress = Assets.getText('proxyServerIdAndAddress.txt').trim()
      let usingProxy = (Assets.getText('proxyServerIdAndAddress.txt') && ['http://username:password@proxy.serviceprovider.com:8000',''].indexOf( Assets.getText('proxyServerIdAndAddress.txt').trim()) === -1) ? true :false
      if(usingProxy){
        console.log('You are using a proxy-server. If it is a mistake, please replace proxyServerIdAndAddress.txt by an empty line');
        // The proxy-chain package performs both basic HTTP proxy forwarding as well as HTTP CONNECT tunnelling to support protocols such as HTTPS and FTP
        newProxyUrl = await proxyChain.anonymizeProxy(proxyServerIdAndAddress);
        // console.log(proxyServerIdAndAddress,newProxyUrl);
      }
      const crawler = await HCCrawler.launch({
        //if you have you own proxy server define it here
        args: (usingProxy) ? [ '--proxy-server='+newProxyUrl ] : [],
        maxConcurrency: 1,
        // eevaluatePage: new Function(c.functionToExecute),
        evaluatePage: (() => {
          const wait = () => new Promise(resolve => void setTimeout(resolve, 5000)); // wait for 5 sec
          return wait().then(() => { h1 : $('h1').text()});
        }),
        customCrawl:  async (page, crawl) => {
          // You can access the page object before requests
          // await page.setRequestInterception(true);
          // await page.addScriptTag({ content: 'var foo = ' + _ });
          await page.mainFrame().addScriptTag({ content: "console.log('in addScriptTag')" });
          //ici on affiche les console.log qui sont dans le evaluatePage
          page.on('console', msg => {
            console.log('console.log:',msg.text());
          });
          //ici on affiche un message si jamais ca foire
          page.on('requestfailed', request => {
            console.log('FAILURE: ', request.url() + ' ' + request.failure().errorText);
            bindInsert(obj._id,crawlID,{error:'requestfailed'},request,request.url() )
          });

          // page.on('request', request => {
          //   if (request.url().endsWith('/')) {
          //     request.continue();
          //   } else {
          //     request.abort();
          //   }
          // });
          // The result contains options, links, cookies and etc.
          const result = await crawl();
          // You can access the page object after requests
          result.content = await page.content();
          // You need to extend and return the crawled result
          return result;
        },
        onSuccess: (result => {
          try {
            // for (var k in result) {
            //   if (result.hasOwnProperty(k)) {     console.log(k); }
            // }
            bindInsert(obj._id,crawlID,result.result,result,result.options.url)
          } catch (e) {
            console.log('bindInsert error in result was', e);
          }
        }),
        onError: (error => {
          try {
            console.log('the URL crawled resulted in an error');
            bindInsert(obj._id,crawlID,{error:String(error).slice(0,500)},{errorOptions:error.options},error.options.url)
          } catch (e) {
            console.log('bindInsert error in error was', e);
          }
        }),

        //options from Queue
        delay: 1500,
        retryDelay: 500,
        // username: 'username',
        // password: 'password',
        retryCount: 1,
        timeout: 10000,
        device: 'Nexus 7',
        // allowedDomains: ['www.reddit.com'],
        screenshot: {
          path: '../../../../../public/img/screenshot/'+obj._id+'.png'
        },

      });


//      await crawler.queue('http://www.whatsmyip.org/');       // Queue a request
/*
      await crawler.queue(['https://example.net/', 'https://example.org/']);  // Queue multiple requests
*/

      await crawler.queue(urlsArray);

       // await crawler.queue(urls[0].URL);

       // await crawler.queue({    // Queue a request with custom options
       //   url: urls[0].URL,
       // });

      await crawler.onIdle(); // Resolved when no queue is left
      await crawler.close(); // Close the crawler
      Crawlers.update({_id:obj._id}, { $set: {status:'Ready'} })
      console.log('crawler1 finished');
    })();

  }
});
