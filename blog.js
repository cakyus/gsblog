
function loadScript(url, callback) {
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

var loadScriptCallback = function() {
   // here, do what ever you want
	$(document).ready(function() {
		// do stuff when DOM is ready
		var myApp = new app;
		myApp.show();
	});
};

loadScript('jquery.min.js', loadScriptCallback);

// here our main code
function app() {
	this.blogs = function () {
		return new appBlogs();
	} 
	this.show = function () {
		var blog = this.blogs().getCurrent();
		blog.show();
	}
}

function appBlogs() {
	this.getCurrent = function () {
		var blog = new appBlog();
		blog.title = document.title;
		blog.keywords = $('meta[name=keywords]').attr('content');
		blog.author = $('meta[name=author]').attr('content');
		blog.dateCreated = $('meta[http-equiv=date]').attr('content');
		blog.dateLastModified = $('meta[http-equiv=last-modified]').attr('content');
		return blog;
	}
}

function appBlog() {
	this.title = '';
	this.keywords = '';
	this.author = '';
	this.dateCreated = '';
	this.dateLastModified = '';
	this.content = '';
	this.show = function () {
		// facebook comments, when not at localhost
		var fbComments = new appPluginFacebookComments;
		
		this.content = $('body').html();
		$('body').html('');
		$('body').append(
			 '<content>'
				+'<div class="blog">'
					+'<h1>'+this.title+'</h1>'
					+this.content
					+'<h6>Keywords: '+this.keywords+'</h6>'
					+'<h6>Date: '+this.dateLastModified+'</h6>'
				+'</div>'
				// -- facebook comments --
				+fbComments.getContent()
			+'</content>'
			+'<div class="sidebar">'
				+'<h1>Recently</h1>'
				+'<div class="Recently">'
					+'<a href="#">Curabitur sapien est, lobortis nec mattis sit amet</a>'
					+'<a href="#">Nulla vitae elit quam</a>'
					+'<a href="#">In condimentum, enim vel gravida viverra, ligula odio blandit sem</a>'
					+'<a href="#">Fusce viverra pulvinar massa sit amet pellentesque</a>'
					+'<a href="#">Proin varius odio a sem tempus imperdiet</a>'
				+'</div>'
				+'<h1>Keywords</h1>'
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
				+'</div>'
			+'</div>'
			);
	}
}

function appPluginFacebookComments() {
	
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

