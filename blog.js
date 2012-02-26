
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
		this.content = $('body').html();
		$('body').html('');
		$('body').append(
			 '<content>'
				+'<div class="blogTitle">'+this.title+'</div>'
				+'<div class="blogContent">'+this.content+'</div>'
				+'<div class="blogFooter">'
					+'<div class="blogKeywords">Keywords: '+this.keywords+'</div>'
					+'<div class="blogDate">Date: '+this.dateLastModified+'</div>'
				+'</div>'
			+'</content>'
			+'<sidebar>'
				+'Natoque in ut? Sagittis duis a elementum enim tempor parturient, placerat natoque dapibus pellentesque penatibus ultricies? Lectus, scelerisque. Ut! Pulvinar et tristique dictumst ac! Placerat phasellus eros, amet est! Tincidunt? Augue augue, habitasse et tristique ridiculus? Nisi elementum elementum lorem! Tortor nascetur.'
			+'</sidebar>'
			);
	}
}