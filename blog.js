
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
		var myBlog = new blog;
	});
};

loadScript('jquery.min.js', loadScriptCallback);

// here our main code
function blog() {
	// add style
	$('head').append('<link rel="stylesheet" href="blog.css" type="text/css" />');
	$('body').prepend('<h1>'+document.title+'</h1>');
}
