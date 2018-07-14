import signalr from 'react-native-signalr';
import * as AppConfig from '../config/app_config';
import { store } from '../store/config';
import { Alert } from 'react-native';
import * as homeAction from '../store/actions/containers/home_action';
import * as loginAction from '../authen/actions/login_action';
import { NetInfo } from 'react-native';
import { Actions } from '../../node_modules/react-native-router-flux';

export var proxy = null;
export var connection = null;
let intervalReConnection = null;

var netConnected = true;
NetInfo.getConnectionInfo().then((connectionInfo) => {
    console.log('khởi tạo net info, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
});
NetInfo.addEventListener(
    'connectionChange',
    handleFirstConnectivityChange
);
function handleFirstConnectivityChange(connectionInfo) {
    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    // NetInfo.removeEventListener(
    //     'connectionChange',
    //     handleFirstConnectivityChange
    // );
    var reducer = store.getState();
    if (connectionInfo.type == 'none') {
        netConnected = false;
        store.dispatch(homeAction.onDisconnect());
    }
    else {
        netConnected = true;
        if (connection && connection.state != 4) {
            store.dispatch(homeAction.onConnected());
        }
    }
}

export function connectSignalr(user) {
    if (!user) {
        store.dispatch(loginAction.logout());
        return;
    }
    proxy = null;
    connection = null;
    connection = signalr.hubConnection(`${AppConfig.API_HOST}signalr`, {
        useDefaultPath: false,
        qs: "X-Requested-With=XMLHttpRequest&" + "access_token=" + user.access_token
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
        if (typeof (error.source) == "string" || error.source.status != 401) {
            //connection.start().done(onConnected).fail(onConnectedFail);
            if (intervalReConnection) {
                intervalReConnection = setInterval(onReconnect(connection), 2000);
            }
        }
    });

    connection.error((error) => {
        if (netConnected) {
            store.dispatch(homeAction.onReconnecting());
        }
        if (typeof (error.source) == "string" || error.source.status != 401) {
            const errorMessage = error.message;
            let detailedError = '';
            console.log('signalr error!', error)
            if (error.source && error.source._response) {
                detailedError = error.source._response;
            }
            if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
                console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
            }
            if (!intervalReConnection && connection.state == 4) {
                intervalReConnection = setInterval(onReconnect(connection), 2000);
            }
        }
        else {
            if (intervalReConnection) {
                clearInterval(intervalReConnection);
            }
            console.log('Unauthorized!')
            Alert.alert('Thông báo', 'Kết nối đến server bị đóng xin vui lòng đăng nhập lại.', [{
                text: 'Ok',
                onPress: (e) => {
                    store.dispatch(loginAction.logout());
                    Actions.reset('login');
                }
            }],
                { cancelable: false });
        }
    });
}
function onConnected() {
    var reducer = store.getState();
    if (intervalReConnection) {
        clearInterval(intervalReConnection);
    }

    if (reducer.homeReducer.signalrDisconnect == true || reducer.homeReducer.signalrReconnecting == true) {
        store.dispatch(homeAction.onConnected());
    }
    console.log('Now connected, connection ID=' + connection.id);
}

function onConnectedFail(e) {
    if (typeof (e.source) == "string" || e.source.status != 401) {
        intervalReConnection = setInterval(onReconnect, 2000); //kết nối lại trong vòng 2 giây
        var reducer = store.getState();
        if (!(reducer.homeReducer.signalrDisconnect == true || reducer.homeReducer.signalrReconnecting == true)) {
            store.dispatch(homeAction.onDisconnect());
        }
        console.log('Connection Failed: ', e);
    }
}

function onReconnect() {
    if (netConnected) {
        var reducer = store.getState();
        if (!(reducer.homeReducer.signalrReconnecting == true)) {
            store.dispatch(homeAction.onReconnecting());
        }
        connection.start().done(onConnected).fail(onConnectedFail);
    }
}