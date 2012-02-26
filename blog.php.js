
var myApp = new app; myApp.init();

function submitFormCallback(response){
	if (response.result != undefined) {
		if (response.result.method != undefined) {
			if (response.result.method == 'displayMessage') {
				displayMessage(response.result.params);
			}
		}
	} else {
		alert('Error:'
			+' '+response.error.code
			+' '+response.error.message
			);
	}	
}
function displayMessage(params){
	alert(params.message);
}

function app() {
	this.init = function() {
		$(document).ready(function() {
			// do stuff when DOM is ready
			myApp.load();
		});		
	}
	this.load = function() {
		var request = new app_request;
		request.method = 'is-login';
		request.callback = this.loadCallback;
		request.send();
	}
	this.loadCallback = function (response) {
		if (response.result != undefined) {
			if (response.result == 1) {
				// already login
				myApp.menuShow('menu-login');
				myApp.tabShow('form-logout');
			} else {
				// not yet login
				myApp.menuShow('menu');
				myApp.tabShow('form-login');
			}
		} else {
			alert('Error:'
				+' '+response.error.code
				+' '+response.error.message
				);
		}	
	}
	this.tabsHide = function () {
		$('.tab').each(function(){
			this.style.display = 'none';
		});
	}
	this.tabShow = function (tabName) {
		this.tabsHide();
		$('#'+tabName).css('display','block');
	}
	this.menusHide = function () {
		$('.menu').each(function(){
			this.style.display = 'none';
		});
	}
	this.menuShow = function (menuName) {
		this.menusHide();
		$('#'+menuName).css('display','block');
	}
	this.formSubmit = function (element) {
		
		var request = new app_request;
		
		request.method = element.parentNode.id;
		request.callback = submitFormCallback;

		// build parameters
		$('#'+element.parentNode.id+' input').each(function(){
			request.params[this.name] = this.value;
		});
		$('#'+element.parentNode.id+' textarea').each(function(){
			request.params[this.name] = this.value;
		});
		
		request.send();
	}
	this.formSubmitCallback = function (response) {
		
	}
}

function app_request() {
	this.url = 'blog.php';
	this.id = 1;
	this.jsonrpc = '2.0';
	this.method = '';
	this.params = {};
	this.callback = null;
	this.send = function () {
		var request = {};
		request.method = this.method;
		request.jsonrpc = this.jsonrpc;
		request.id = this.id;
		request.params = this.params;
		$.post(this.url, JSON.stringify(request), this.callback, 'json');
	}
}
