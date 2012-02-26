<?php

// the password can not be empty. the value of password below is md5 of
// password and not the password it self.

$CONFIG_PASSWORD = '456b7016a916a4b178dd72b947c152b7';

$application = new Application;
$application->start();

// Main code
if (empty($CONFIG_PASSWORD)) {
	
}

class Application {
	public function start() {
		$request = json_decode(file_get_contents('php://input'));
		$response = new Response;

		if ($response->setRequest($request) == false) {
			$response->error->code = 400;
			$response->error->message = 'Bad request';
			exit($response);
		}
		
		$response->result->method = 'messageBox';
		$response->result->params->message = 'hello';

		echo $response;
	}
}

class Response {
	public $jsonrpc = '2.0';
	public $result = null;
	public $error = null;
	public $id = 0;
	public function __construct() {
		$this->error = new Response_Error;
		$this->result = new Response_Result;
	}
	public function setRequest($request) {
		// @todo request validation
		$this->id = $request->id;
		return true;
	}
	public function __toString() {
		if (empty($this->error->message)) {
			unset($this->error);
		} else {
			unset($this->result);
		}
		$result = json_encode($this);
		$this->result = null;
		$this->error = new Response_Error;
		return $result;
	}
}

class Response_Result {
	public $method = '';
	public $params = null;
	public function __construct() {
		$this->params = new stdClass;
	}
}

class Response_Error {
	public $code = 0;
	public $message = '';
} 
