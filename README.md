Arachnida : simple web interface to pilot crawlers (Under Construction)
=========

Scrape the web easily -> no need to be a coding expert.
Arachnida is providing a simple web interface to pilot powerful crawlers (running Headless Chrome)

# Install (2 seconds) #
open a terminal, and run:
```
git clone https://github.com/guillim/Arachnida.git arachnida  && cd arachnida  && meteor
```

**Finished !** 

# Use (1 minute) #  

Now open google chrome (or any browser) and follow this link: http://localhost:3000  

You will be able to add a crawler, configure it, and run it in seconds ! 

### 1. Create a crawler on the main page: ###

First give it a name, and leave the function empty (except if you know what you're doing) 
![screenshot](https://ibin.co/4GSHblERpQfn.png)

### 2. Configure your crawler: ###

This is the only moment when a bit of coding knowledge is helpful. In the main part, you need to write a JavaScript function that will be executed on every page scraped by the crawler.   

For instance, to extract the title of each page, write:
```
return {             
  title: $('title').text(),
};
```  
Yes, jquery is already set up. You simply need to provide the selectors (id, class...)

![screenshot](https://ibin.co/4GSHWS9cgqUR.png)

### View the results: ###
![screenshot](https://ibin.co/4GSJEILx9T9s.png)


## What's included ##
* See screenshot of your running crawler
* Manually add URL to be scraped, or upload a CSV 
* Sign in / Sign up  
* Account management: Profile Page, Username, Change password, Delete account...
* Admin for the webmaster: go to `/admin`
* Router
* MongoDB as database

# Contribute #  

I am looking for people to make pull requests to improve Arachnida. Please do it :)  
TO DO:  
1. Setup live queue of url to be scraped (ex: at the moment, you can't click straight on a link and scrape it)
2. Live Log from the server brought to the interface to help debugging
3. Results export functionality (CSV & Json)  

### Thanks ###  
Boilerplate: yogiben.  
HeadlessChrome layer: yujiosaka  
