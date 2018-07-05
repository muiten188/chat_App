import signalr from 'react-native-signalr';
import * as AppConfig from '../config/app_config';
export var proxy=null;
export function connectSignalr(user) {
    const connection = signalr.hubConnection(`${AppConfig.API_HOST}signalr`, {
        useDefaultPath: false,
        qs: "access_token=" + user.access_token
    });
    connection.logging = true;
    proxy = connection.createHubProxy('chatHub');
    //receives broadcast messages from a hub function, called "helloApp"
    
    proxy.on('addMessagePrivate', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('addMessageToGroup', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('addUserGroup', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('getAllGroupMessage', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('getAllMessagePrivate', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('getAllMessageUser', (listHubUser, count) => {
        console.log('message-from-server: ');
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('getAllUser', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('getListUserInGroup', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('getUserForGroup', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('joinRoom', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('leaveRoom', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('loadAllContact', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('loadAllGroup', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('loadAllMessage', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('outFromGroup', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('removeGroup', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('removeUserFromGroup', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
        //Here I could response by calling something else on the server...
    });
    //
    proxy.on('updateUserGroup', (mes) => {
        console.log('message-from-server: ', mes);
        debugger;
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
        console.log('Failed');
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