(function () {

// here we are defining the backend endpoint
const EVENT_SOURCE_ENDPOINT = 'backend/event_server.php';

// instantiating the EventSource and pointing it to our endpoint
const ServerEvents = new EventSource(EVENT_SOURCE_ENDPOINT);

// listening to the connection with the server
ServerEvents.addEventListener('open', e => {
	handleServerConnection();
});

// listening to server messages
ServerEvents.addEventListener('message', e => {
	const data = JSON.parse(e.data);
	handleServerMessage(data);
});

// listening to errors
ServerEvents.addEventListener('error', e => {
	handleServerError(e);
});

// ------------------------------------------------------

// append a string (msg) on our <pre> element
uiRenderMessage = (msg) => {
	document.getElementById('server-messages').append(`${msg}\n`);
}

// show the connected message when connect to the server
handleServerConnection = () => {
	uiRenderMessage('A connection with server has been established\n');
}

// handle the messages received by the server
handleServerMessage = msg => {
	uiRenderMessage(msg);
	if (msg === 'done') {
		// if you don't handle a closing message, the process will
		// start all over again.
		uiRenderMessage('\n');
		ServerEvents.close();
	}
}

handleServerError = evt => {
	uiRenderMessage('An unexpected error occurred :(');
	console.error(evt);
}

})();