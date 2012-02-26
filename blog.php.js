$('document').ready(function(){
	hideTabs();
});

function hideTabs(){
	$('.tab').each(function(){
		this.style.display = 'none';
	});
}
function showTab(tabName){
	hideTabs();
	$('#'+tabName).css('display','block');
}
function submitForm(element){
	
	var url = 'blog.php';
	var request = {};
	request.method = element.parentNode.id;
	request.id = 1;
	request.jsonrpc = '2.0';
	
	// build parameters
	request.params = {};
	$('#'+element.parentNode.id+' input').each(function(){
		request.params[this.name] = this.value;
	});
	$('#'+element.parentNode.id+' textarea').each(function(){
		request.params[this.name] = this.value;
	});
	
	$.post(url, JSON.stringify(request), submitFormCallback, "json");
}
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
