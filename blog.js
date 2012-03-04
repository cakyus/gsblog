
var myApp = new app; myApp.initialize();

// here our main code
function app() {
	this.require = function (url, callback) {
		// adding the script tag to the head as suggested before
	   var head = document.getElementsByTagName('head')[0];
	   var script = document.createElement('script');
	   script.type = 'text/javascript';
	   script.src = url;

	   // then bind the event to the callback function 
	   // there are several events for cross browser compatibility
	   script.onreadystatechange = callback;
	   script.onload = callback;

	   // fire the loading
	   head.appendChild(script);
	}
	this.loadScriptCallback = function () {
		$(document).ready(function() {
			// do stuff when DOM is ready
			myApp.show();
		});
	}
	this.show = function () {
		var blog = myApp.blogs.getCurrent();
		blog.show();
	}
	this.initialize = function () {
		this.require('../jquery.min.js', this.loadScriptCallback);
	}
}

app.prototype.widget = [];
app.prototype.widget.id = '';
app.prototype.widget.title = '';
app.prototype.widget.content = '';
app.prototype.widget.toString = function () {
	return '<div class="'+this.name+' widget">'
		+'<h1>'+this.title+'</h1>'
		+this.content
		+'</div>'
		;
};

app.prototype.widgets = [];

app.prototype.widgets.profileCard = [];
app.prototype.widgets.profileCard.prototype = app.prototype.widget;
app.prototype.widgets.profileCard.toString = function (){
	this.name = 'profileCard';
	this.title = '<a href="index.html">Code Blog</a>';
	this.content = 'Unlocking Knowledge,<br />Empowering Minds'
		+'<br />by <a href="about.html">Yus Uf</a>'
		;
	return app.prototype.widget.toString.call(this);
};

app.prototype.widgets.recentBlogs = [];
app.prototype.widgets.recentBlogs.prototype = app.prototype.widget;
app.prototype.widgets.recentBlogs.toString = function (){
	this.name = 'recentBlogs';
	this.title = 'Recently Baked';
	this.content = '<a href="#" class="menu" >Curabitur sapien est, lobortis nec mattis sit amet</a>'
			+'<a href="#" class="menu">Nulla vitae elit quam</a>'
			+'<a href="#" class="menu">In condimentum, enim vel gravida viverra, ligula odio blandit sem</a>'
			+'<a href="#" class="menu">Fusce viverra pulvinar massa sit amet pellentesque</a>'
			+'<a href="#" class="menu">Proin varius odio a sem tempus imperdiet</a>'
			+'<a href="#" class="menu">Curabitur sapien est, lobortis nec mattis sit amet</a>'
			+'<a href="#" class="menu">Nulla vitae elit quam</a>'
			+'<a href="#" class="menu">In condimentum, enim vel gravida viverra, ligula odio blandit sem</a>'
			+'<a href="#" class="menu">Fusce viverra pulvinar massa sit amet pellentesque</a>'
			+'<a href="#" class="menu">Proin varius odio a sem tempus imperdiet</a>'
			;
	return app.prototype.widget.toString.call(this);
};

app.prototype.widgets.facebookComments = [];
app.prototype.widgets.facebookComments.prototype = app.prototype.widget;
app.prototype.widgets.facebookComments.toString = function () {
	// disable on localhost
	if (	window.location.host == '127.0.0.1'
		|| 	window.location.host == 'localhost'
		) {
			// do nothing
	} else {
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		return '<div class="fb-comments"'
			+' data-href="'+document.location.href+'"'
			+' data-num-posts="2"'
			+'></div>';
	}		
	return '';
}

app.prototype.widgets.keywords = [];
app.prototype.widgets.keywords.prototype = app.prototype.widget;
app.prototype.widgets.keywords.toString = function () {
	return 	'<h1>Keywords</h1>'
		+'<div class="keyword">'
			+'<a href="#">HTML</a>'
			+'<a href="#">CSS</a>'
			+'<a href="#">XML</a>'
			+'<a href="#">XHTML</a>'
			+'<a href="#">JavaScript</a>'
			+'<a href="#">CSS</a>'
			+'<a href="#">XML</a>'
			+'<a href="#">XHTML</a>'
			+'<a href="#">JavaScript</a>'
			+'<a href="#">HTML</a>'
		+'</div>';
}

app.prototype.widgets.socialNetwork = [];
app.prototype.widgets.socialNetwork.prototype = app.prototype.widget;
app.prototype.widgets.socialNetwork.toString = function () {
	return '<div class="social">'
		+'Share: <a href="#" onclick="window.open(\''
			+'http://www.facebook.com/sharer.php?'
				+'u='+encodeURIComponent(location.href)
				+'&t='+encodeURIComponent(document.title)
			+'\'); return false;">'
			+'facebook'
			+'</a>'
		+', <a href="#" onclick="window.open(\''
			+'http://twitter.com/home?status='
				+document.title
				+'. '+location.href
			+'\'); return false;">'
			+'tweeter'
			+'</a>'
		+', <a href="#" onclick="window.open(\''
			+'https://plusone.google.com/_/+1/confirm?hl=en'
				+'&url='+encodeURIComponent(location.href)
				+'&title='+encodeURIComponent(document.title)
			+'\'); return false;">'
			+'google plus'
			+'</a>'
		+'</div>'
		;
}

app.prototype.widgets.blog = [];
app.prototype.widgets.blog.title = '';
app.prototype.widgets.blog.keywords = '';
app.prototype.widgets.blog.author = '';
app.prototype.widgets.blog.dateCreated = '';
app.prototype.widgets.blog.dateLastModified = '';
app.prototype.widgets.blog.content = '';
app.prototype.widgets.blog.toString = function () {
	
	var blogKeyword = this.keywords;
	
	if (blogKeyword == undefined) {
		blogKeyword = '';
	} else {
		blogKeyword = '<h6>Keywords: '+this.keywords+'</h6>';
	}
	
	this.content = $('body').html();
	return '<div class="blog">'
			+'<h1>'+this.title+'</h1>'
			+this.content
			+blogKeyword
			+'<h6>Date: '+this.dateLastModified+'</h6>'
		+'</div>';
}
app.prototype.widgets.blog.show = function () {
	
	var contentText = '';
	var widgetNames = ['blog','socialNetwork','facebookComments'];
	for (i = 0; i < widgetNames.length; i++){
		contentText += myApp.widgets[widgetNames[i]];
	}
	
	var sidebarText = '';
	var widgetNames = ['profileCard','recentBlogs'];
	
	for (i = 0; i < widgetNames.length; i++){
		sidebarText += myApp.widgets[widgetNames[i]];
	}
	
	$('body').html('');
	$('body').append('<content>'+contentText+'</content>'
		+'<div class="sidebar">'+sidebarText+'</div>'
		);
}

app.prototype.blogs = [];
app.prototype.blogs.getCurrent = function () {
	var blog = app.prototype.widgets.blog;
	blog.title = document.title;
	blog.keywords = $('meta[name=keywords]').attr('content');
	blog.author = $('meta[name=author]').attr('content');
	blog.dateCreated = $('meta[http-equiv=date]').attr('content');
	blog.dateLastModified = $('meta[http-equiv=last-modified]').attr('content');
	return blog;
}

