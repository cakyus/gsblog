<?php

include('config.php');

$application = new Application;
$application->start();

class Application {
	public function start() {
		
		session_start();
		
		$request = json_decode(file_get_contents('php://input'));
		$response = new Response;

		if ($response->setRequest($request) == false) {
			$response->error->code = 400;
			$response->error->message = 'Bad request';
			exit($response);
		}
		
		// callback function mapping
		if ($request->method == 'tabLogin') {
			$this->login($request, $response, $request->params->password);
		} else {
			$response->error->code = 400;
			$response->error->message = 'Invalid callback';
		}	
		
		echo $response;
	}
	
	// @todo separate controller from class Application
	public function login($request, $response, $password) {
		
		$config = new Config;
		
		if (md5($password) == $config->password) {
			$response->result->method = 'displayMessage';
			$response->result->params->message = 'Login 0k';
		} else {
			$response->result->method = 'displayMessage';
			$response->result->params->message = 'Login Fail';
		}
		
	}
}

class Application_Controller {
	public function actionLogin() {
		
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
