import signalr from 'react-native-signalr';
import * as AppConfig from '../config/app_config';
import {store} from '../store/config';
import * as homeAction from '../store/actions/containers/home_action';
export var proxy = null;
export var connection = null;
let intervalReConnection = null;
export function connectSignalr(user) {
    proxy = null;
    connection = null;
    console.log(store);
    connection = signalr.hubConnection(`${AppConfig.API_HOST}signalr`, {
        useDefaultPath: false,
        qs: "X-Requested-With=XMLHttpRequest&access_token=CLutf4FZ94c9W9_c32dF2E9aTTqBuG-eV8g4K-rT4xXQmt3YYYQAL5dxbp8JS6qBRMy2LpChVL-kDRC0n3TSITYdDNBZ08VMZetOrpLuEYaFiLNq4YwxaMBGMuuknO_FH75qS6PVK25Rik9wZu550cy0-sDOyhwOfvbQyCfNSBNy5UcY-JQhqbR5B4wJVljybCGVRd3lVl-sPoqebGZbJRMY5s3yQABxuRd-A8oK7BA0n_Yg3oH0Ulw2gUTII9ArDLarLHe2M0N7WntbQtOyv7eg7FWaWHtdlGj3Okxe3ETIbiRa5Qhx26tLJ-20enQWwt8LMmrXwxf_ZtS1bczSP_VNKPd0wcXPMIvyEzHy71d3MZCHP7C_G7vBl0nEgDTgWhyrdvQf2g176HUM10UtCOT45N-lMt9lK9cs8-TGi9jZqjl4MrluyQCB6Jhu7dW7aSnBr_dlKeF1cXEI6kQMxxiRZmErkG1uOTLzKNT6jcP5R-_IoV144W-LLVldaY2Lw-yNVnpkek8aUig_OG-rpgasda"
    });//user.access_token
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
        console.log('disabled signal')
        //connection.start().done(onConnected).fail(onConnectedFail);
    });

    connection.error((error) => {
        store.dispatch(homeAction.onReconnecting());
        if (error.source.status != 401) {
            const errorMessage = error.message;
            let detailedError = '';
            console.log('signalr error!', error)
            debugger;
            if (error.source && error.source._response) {
                detailedError = error.source._response;
            }
            if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
                console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
            }
            console.debug('SignalR error: ' + errorMessage, detailedError)
        }
        else {
            console.log('Unauthorized!')
        }
    });
}
function onConnected() {
    console.log('Now connected, connection ID=' + connection.id);
}

function onConnectedFail(e) {
    // setTimeout(() => {
    //     onReconnect(connection);
    // }, 2000); //kết nối lại trong vòng 2 giây

    console.log('Connection Failed: ', e);
}

function onReconnect(connection) {
    connection.start().done(onConnected).fail(onConnectedFail);
}