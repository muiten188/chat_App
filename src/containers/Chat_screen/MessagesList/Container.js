import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, View, Text, AppState } from 'react-native';
import { connect } from 'react-redux'
import { Container } from 'native-base';
import { bindActionCreators } from "redux";
import * as chatScreen_action from '../../../store/actions/containers/chatScreen_action';
import { proxy } from '../../../helper/signalr';
import * as helperSignal from '../../../helper/signalr';
import MessageListComponent from './Component'
import { Actions } from '../../../../node_modules/react-native-router-flux';
import styles from "./Styles";
class MessagesListContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }
  componentDidMount() {
    //this.props.loadMessages()
    const { user, isGroupChat, group } = this.props;
    AppState.addEventListener('change', (val) => {
      console.log('app change: ',val);
      if (val == 'active') {
        if (!isGroupChat) {
          proxy.invoke("removeInteracPrivate");
          proxy.invoke('getAllMessagePrivate', user.ID);
        }
        else {
          proxy.invoke("removeInteracGroup");
          proxy.invoke('getAllGroupMessage', group.ID);
        }
      }
      else {
        if (!isGroupChat) {
          proxy.invoke("removeInteracPrivate");
        }
        else {
          proxy.invoke("removeInteracGroup");
        }
      }

    });
    this.onSignalEvent(isGroupChat);
    if (proxy.connection.state == 1) {
      try {
        if (!isGroupChat) {
          proxy.invoke("removeInteracPrivate");
          proxy.invoke('getAllMessagePrivate', user.ID);
        }
        else {
          proxy.invoke("removeInteracGroup");
          proxy.invoke('getAllGroupMessage', group.ID);
        }
      }
      catch (e) {
        Alert.alert('Thông báo', 'Kết nối đến server bị đóng xin vui lòng đăng nhập lại.', [{
          text: 'Ok',
          onPress: (e) => {
            Actions.reset('login');
          }
        }],
          { cancelable: false });
      }
    }
    else {
      helperSignal.onReconnect(() => {
        if (!isGroupChat) {
          proxy.invoke("removeInteracPrivate");
          proxy.invoke('getAllMessagePrivate', user.ID);
        }
        else {
          proxy.invoke("removeInteracGroup");
          proxy.invoke('getAllGroupMessage', group.ID);
        }
      });
    }
  }
  onSignalEvent(isGroupChat) {
    if (!isGroupChat) {
      proxy.on('messagePrivates', (messages, userId) => {
        var arrMessages = [];
        for (var i = messages.length - 1; i >= 0; i--) {
          arrMessages.push(messages[i]);
        }
        console.log('List Messages: ', arrMessages);
        var arr15 = [];
        if (arrMessages.length > 10) {
          for (var i = 0; i < 10; i++) {
            arr15.push(arrMessages[i]);
          }
        }
        else {
          arr15 = arrMessages;
        }
        this.setState({ messages: arr15 });
      })
      proxy.on('messagePrivate', (message, isMe) => {
        var arrMessages = this.state.messages;
        arrMessages.unshift(message);
        var arr15 = [];
        if (arrMessages.length > 10) {
          for (var i = 0; i < 10; i++) {
            arr15.push(arrMessages[i]);
          }
        }
        else {
          arr15 = arrMessages;
        }
        this.setState({ messages: arr15 });
        console.log('new Message: ', message);
        console.log('isMe: ', isMe);
      })
    }
    else {
      proxy.on('allGroupMessage', (messages, userId) => {
        var arrMessages = [];
        for (var i = messages.length - 1; i >= 0; i--) {
          arrMessages.push(messages[i]);
        }
        console.log('List Messages: ', arrMessages);
        var arr15 = [];
        if (arrMessages.length > 10) {
          for (var i = 0; i < 10; i++) {
            arr15.push(arrMessages[i]);
          }
        }
        else {
          arr15 = arrMessages;
        }
        this.setState({ messages: arr15 });
      })
      proxy.on('groupMessage', (message, isMe) => {
        var arrMessages = this.state.messages;

        arrMessages.unshift(message);
        var arr15 = [];
        if (arrMessages.length > 10) {
          for (var i = 0; i < 10; i++) {
            arr15.push(arrMessages[i]);
          }
        }
        else {
          arr15 = arrMessages;
        }
        this.setState({ messages: arr15 });
        console.log('new Message: ', message);
        console.log('isMe: ', isMe);
      })
    }
  }
  componentWillUnmount() {
    const { isGroupChat } = this.props;
    if (proxy.connection.state == 1) {
      if (!isGroupChat) {
        proxy.invoke("removeInteracPrivate");
      }
      else {
        proxy.invoke("removeInteracGroup");
      }
    }
    proxy.off("messagePrivates");
    proxy.off("messagePrivate");
    proxy.off("allGroupMessage");
    proxy.off("groupMessage");
    AppState.removeEventListener('change');
  }

  render() {
    const { props } = this;
    const {
      signalrDisconnect,
      signalrReconnecting,
    } = this.props.homeReducer;
    //const data = getChatItems(props.chatScreenReducer.messages).reverse();
    return (
      <Container>
        {
          signalrDisconnect ? <View style={styles.disconnectSignalr}>
            <Text style={{ color: '#fff' }}>{"Mất kết nối..."}</Text>
          </View> : null
        }
        {
          signalrReconnecting ? <View style={styles.connectingSignalr}>
            <Text style={{ color: '#fff' }}>{"Đang kết nối..."}</Text>
          </View> : null
        }
        <MessageListComponent
          data={this.state.messages} cUser={props.user} group={props.group} />
      </Container>
    )
  }
}

const getChatItems = data => {
  return data ? Object.keys(data).map(key => data[key]) : []
}

const mapStateToProps = state => ({
  homeReducer: state.homeReducer,
  chatScreenReducer: state.chatScreenReducer
})


function mapToDispatch(dispatch) {
  return {
    chatScreen_action: bindActionCreators(chatScreen_action, dispatch)
  };
}

// MessagesListContainer.propTypes = {
//   messages: PropTypes.object,
//   error: PropTypes.string,
//   loadMessages: PropTypes.func.isRequired
// }

export default connect(mapStateToProps, mapToDispatch)(MessagesListContainer)
