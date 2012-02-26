<?php

include('config.php');

$application = new Application;
$application->start();

// handle low level application
class Application {
	
	public function start() {
		
		session_start();
		
		$request = json_decode(file_get_contents('php://input'));
		$response = new Response;

		// input validation
		if ($response->setRequest($request) == false) {
			$response->error->code = 400;
			$response->error->message = 'Bad request';
			exit($response);
		}
		
		$controller = new Application_Controller($request, $response);
		
		echo $response;
	}
}

class Application_Controller {
	
	public $request;
	public $response;
	
	public function __construct($request, $response) {
		$this->request = $request;
		$this->response = $response;
		// callback function mapping
		if ($request->method == 'form-login') {
			$this->login();
		} else {
			$response->error->code = 400;
			$response->error->message = 'Invalid callback';
		}	
	}
	
	public function login() {
		
		$config = new Config;
		
		if (md5($this->request->params->password) == $config->password) {
			$this->response->result->method = 'displayMessage';
			$this->response->result->params->message = 'Login 0k';
		} else {
			$this->response->result->method = 'displayMessage';
			$this->response->result->params->message = 'Login Fail';
		}
		
	}
}

class Config {
	private $params;
	public function __construct() {
		global $CONFIG;
		$this->params = $CONFIG;
	}
	public function __get($name) {
		if (isset($this->params[$name])) {
			return $this->params[$name];
		}
		return null;
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
