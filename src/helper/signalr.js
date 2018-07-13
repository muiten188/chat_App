import signalr from 'react-native-signalr';
import * as AppConfig from '../config/app_config';
export var proxy = null;
export var connection = null;
let intervalReConnection = null;
export function connectSignalr(user) {
    proxy = null;
    connection = null;
    connection = signalr.hubConnection(`${AppConfig.API_HOST}signalr`, {
        useDefaultPath: false,
        qs: "access_token=" + user.access_token
    });
    connection.logging = true;
    proxy = connection.createHubProxy('chatHub');
    //receives broadcast messages from a hub function, called "helloApp"
    proxy.on('addMessagePrivate', (mes) => {
        console.log('message-from-server: ', mes);

        //Here I could response by calling something else on the server...
    });


    // atempt connection, and handle errors
    connection.start().done(onConnected).fail(onConnectedFail);

    //connection-handling
    connection.connectionSlow(() => {
        console.log('We are currently experiencing difficulties with the connection.')
    });

    connection.disconnected(function () {
        alert('disabled')
        connection.start().done(onConnected).fail(onConnectedFail);
    });

    connection.error((error) => {
        const errorMessage = error.message;
        let detailedError = '';
        alert('signalr error!')
        if (error.source && error.source._response) {
            detailedError = error.source._response;
        }
        if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
            console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
        }
        console.debug('SignalR error: ' + errorMessage, detailedError)
    });
}
function onConnected() {
    console.log('Now connected, connection ID=' + connection.id);
}

function onConnectedFail(e) {
    setTimeout(() => {
        onReconnect(connection);
    }, 2000); //kết nối lại trong vòng 2 giây
    
    console.log('Connection Failed: ', e);
}

function onReconnect(connection) {
    connection.start().done(onConnected).fail(onConnectedFail);
}