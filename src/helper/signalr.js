import signalr from 'react-native-signalr';
import * as AppConfig from '../config/app_config';
export var proxy=null;
export var connection=null;
export function connectSignalr(user) {
    proxy=null;
    connection=null;
    connection= signalr.hubConnection(`${AppConfig.API_HOST}signalr`, {
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
    connection.start().done(() => {
        console.log('Now connected, connection ID=' + connection.id);

        // proxy.invoke('bachTest', 'bách gửi lên server')
        //     .done((directResponse) => {
        //         console.log('direct-response-from-server: ', directResponse);
        //     }).fail(() => {
        //         console.warn('Something went wrong when calling server, it might not be up and running?')
        //     });
        // proxy.invoke('callClient', 'bách gọi hàm clien từ server')
        //     .done((directResponse) => {
        //         //console.log('direct-response-from-server: ', directResponse);
        //     }).fail((e) => {
        //         console.warn('Something went wrong when calling server, it might not be up and running?')
        //     });

    }).fail((e) => {
        console.log('Failed',e);
    });

    //connection-handling
    connection.connectionSlow(() => {
        console.log('We are currently experiencing difficulties with the connection.')
    });

    connection.error((error) => {
        const errorMessage = error.message;
        let detailedError = '';
        if (error.source && error.source._response) {
            detailedError = error.source._response;
        }
        if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
            console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
        }
        console.debug('SignalR error: ' + errorMessage, detailedError)
    });
}