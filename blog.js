
var myApp = new app; myApp.init();

// here our main code
function app() {
	this.blogs = function () {
		return new app_blogs();
	}
	this.loadScript = function (url, callback) {
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
		var blogs = new app_blogs;
		var blog = blogs.getCurrent();
		blog.show();
	}
	this.init = function () {
		this.loadScript('../jquery.min.js', this.loadScriptCallback);
		//this.show();
	}
}

function app_blogs() {
	this.getCurrent = function () {
		var blog = new app_blog();
		blog.title = document.title;
		blog.keywords = $('meta[name=keywords]').attr('content');
		blog.author = $('meta[name=author]').attr('content');
		blog.dateCreated = $('meta[http-equiv=date]').attr('content');
		blog.dateLastModified = $('meta[http-equiv=last-modified]').attr('content');
		return blog;
	}
}

function app_blog() {
	this.title = '';
	this.keywords = '';
	this.author = '';
	this.dateCreated = '';
	this.dateLastModified = '';
	this.content = '';
	this.show = function () {
		// facebook comments, when not at localhost
		var pluginfacebookComments = new app_plugin_facebookComments;
		var pluginSocial = new app_plugin_social;
		var sidebarProfileCard = new app_plugin_profileCard;
		var sidebarRecent = new app_plugin_recent;
		var sidebarKeyword = new app_plugin_keywords;
		
		var blogKeyword = this.keywords;
		
		if (blogKeyword == undefined) {
			blogKeyword = '';
		} else {
			blogKeyword = '<h6>Keywords: '+this.keywords+'</h6>';
		}
		
		this.content = $('body').html();
		$('body').html('');
		$('body').append(
			 '<content>'
				+'<div class="blog">'
					+'<h1>'+this.title+'</h1>'
					+this.content
					+blogKeyword
					+'<h6>Date: '+this.dateLastModified+'</h6>'
				+'</div>'
				+pluginSocial.getContent()
				+pluginfacebookComments.getContent()
			+'</content>'
			+'<div class="sidebar">'
				+sidebarProfileCard.getContent()
				+sidebarRecent.getContent()
			+'</div>'
			);
	}
}

function app_plugin_profileCard() {
	this.getContent = function () {
		return '<div class="profileCard">'
			+'<h1><a href="index.html">Code Blog</a></h1>'
			+'Unlocking Knowledge,<br />Empowering Minds'
			+'<br />by <a href="about.html">Yus Uf</a>'
		+'</div>';
	}
}

function app_plugin_recent() {
	this.getContent = function () {
		return '<h1>Recently Baked</h1>'
		+'<div class="recently">'
			+'<a href="#">Curabitur sapien est, lobortis nec mattis sit amet</a>'
			+'<a href="#">Nulla vitae elit quam</a>'
			+'<a href="#">In condimentum, enim vel gravida viverra, ligula odio blandit sem</a>'
			+'<a href="#">Fusce viverra pulvinar massa sit amet pellentesque</a>'
			+'<a href="#">Proin varius odio a sem tempus imperdiet</a>'
			+'<a href="#">Curabitur sapien est, lobortis nec mattis sit amet</a>'
			+'<a href="#">Nulla vitae elit quam</a>'
			+'<a href="#">In condimentum, enim vel gravida viverra, ligula odio blandit sem</a>'
			+'<a href="#">Fusce viverra pulvinar massa sit amet pellentesque</a>'
			+'<a href="#">Proin varius odio a sem tempus imperdiet</a>'
		+'</div>';
	}
}

function app_plugin_keywords() {
	this.getContent = function () {
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
}

function app_plugin_social() {
	
	this.getContent = function() {
		
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
}

function app_plugin_facebookComments() {
		
	this.getContent = function() {
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
}
