Template.printScreenshot.onRendered(function () {
	let crawlerID = this.data.crawlerID
	let tmpl = this
	this.interval = setInterval(function(){
		console.log('do it');
		tmpl.$('#imgScreenshot').attr('src',"/img/screenshot/"+crawlerID+".png?"+Math.round(Math.random()*1000000000))
	}, 1000);
});


Template.printScreenshot.onDestroyed(function(){
	clearInterval(this.interval)
});
