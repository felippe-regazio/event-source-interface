<?php

	header('Content-Type: text/event-stream');
	header('Cache-Control: no-cache');

	function send_message ($message) {
	  echo "data: " . json_encode($message) . PHP_EOL;
	  echo PHP_EOL;
	  ob_flush();
	  flush();
	}

	for ($i = 0; $i < 50; $i++) {
		send_message($i + 1);
		sleep(2);
	}

	send_message('done');