import React, { Component } from 'react'
import { View, AppState, Alert, Text, TouchableOpacity } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import MessagesList from './MessagesList'
import MessageForm from './MessageForm'
import { proxy } from '../../helper/signalr';
import * as helperSignal from '../../helper/signalr';
import * as appConfig from '../../config/app_config';
import { Actions } from '../../../node_modules/react-native-router-flux';
import IconVector from 'react-native-vector-icons/FontAwesome';
import styles from './Styles'
import pick from '../../helper/image_picker';
import uploadFile from '../../helper/upload_image';
import { Button } from 'native-base';
import Container from './MessageForm';
import Loading from "../../components/Loading";
class objectMessage {
  _id = Math.round(Math.random() * 1000000);
  text = 'My message';
  createdAt = new Date();
  user = {
    _id: 2,
    name: 'React Native',
    avatar: 'https://i2-prod.croydonadvertiser.co.uk/news/croydon-news/article474950.ece/ALTERNATES/s810/Croydon-tram.jpg',
  };
  //image = 'https://facebook.github.io/react/img/logo_og.png';
  // Any additional custom parameters are passed through
}

class ChatScreenComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLocalLoading:true,
      messages: [],
    }

  }
  convertMessageToGiftChat(oMessage, fromGroup) {
    const { user } = this.props;
    var newMessGirfChat = new objectMessage();
    // newMessGirfChat._id = oMessage.ID;
    newMessGirfChat.text = oMessage.Content;
    newMessGirfChat.createdAt = new Date(oMessage.CreatedDate);
    newMessGirfChat.user = {
      _id: oMessage.FromID,
      name: 'Người gửi',
      avatar: user.Avatar ? `${appConfig.API_HOST_NO}${user.Avatar}` : 'https://i2-prod.croydonadvertiser.co.uk/news/croydon-news/article474950.ece/ALTERNATES/s810/Croydon-tram.jpg'
    };

    if (fromGroup) {
      newMessGirfChat.user.avatar = oMessage.FromAvatar ? `${appConfig.API_HOST_NO}${oMessage.FromAvatar}` : 'https://i2-prod.croydonadvertiser.co.uk/news/croydon-news/article474950.ece/ALTERNATES/s810/Croydon-tram.jpg';
    }
    if (oMessage.IsFile) {
      newMessGirfChat.image = `${appConfig.API_HOST_NO}${oMessage.Content}`;
      newMessGirfChat.text = '';
    }
    return newMessGirfChat;
  }
  componentDidMount() {
    //this.props.loadMessages()
    const { user, isGroupChat, group } = this.props;
    AppState.addEventListener('change', (val) => {
      console.log('app change: ', val);
      if (proxy.connection.state == 1) {
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
        var arr = [];
        for (var i = 0; i < messages.length; i++) {
          var messGiftChat = this.convertMessageToGiftChat(messages[i])
          arr.push(messGiftChat);
        }
        this.setState({ messages: arr.reverse(),isLocalLoading:false });
      })
      proxy.on('messagePrivate', (message, isMe) => {
        var messGiftChat = this.convertMessageToGiftChat(message);
        //arrMessages.unshift(messGiftChat);
        // this.setState({ messages: arrMessages });
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messGiftChat),
          };
        });
        console.log('new Message: ', message);
        console.log('isMe: ', isMe);
      })
    }
    else {
      proxy.on('allGroupMessage', (messages, userId) => {
        var arrMessages = [];
        for (var i = 0; i < messages.length; i++) {
          var messGiftChat = this.convertMessageToGiftChat(messages[i], true)
          arrMessages.push(messGiftChat);
        }
        this.setState({ messages: arrMessages.reverse(),isLocalLoading:false });
      })
      proxy.on('groupMessage', (message, isMe) => {
        var messGiftChat = this.convertMessageToGiftChat(message, true);
        //arrMessages.unshift(messGiftChat);
        // this.setState({ messages: arrMessages });

        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messGiftChat),
          };
        });
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
    if (proxy.connection && proxy.connection.state == 1) {
      proxy.invoke('loadAllContact')
    }
    proxy.off("messagePrivates");
    proxy.off("messagePrivate");
    proxy.off("allGroupMessage");
    proxy.off("groupMessage");
    AppState.removeEventListener('change');
  }

  componentWillMount() {
    // var mes = {
    //   _id: 1,
    //   text: 'bùi đình bách',
    //   createdAt: new Date(),
    //   image: 'https://placeimg.com/140/140/any',
    //   user: {
    //     _id: 1,
    //     name: 'React Native',
    //     avatar: 'https://placeimg.com/140/140/any',
    //   },
    // };
    // var messages = [];
    // for (var i = 0; i < 42; i++) {
    //   var obj = mes;
    //   obj._id = obj._id + 1;
    //   messages.push(obj);
    // }
    // this.setState({
    //   messages: messages
    // })
  }

  onSend(messages = []) {
    const { isGroupChat, user, group } = this.props;
    if (messages.length <= 0) {
      return;
    }
    var message = messages[0].text;
    if (proxy.connection.state == 1) {
      if (!isGroupChat) {
        proxy.invoke('addMessagePrivate', user.ID, message).done(() => {

        })
      }
      else {
        proxy.invoke('addMessageToGroup', group.ID, group.Name, message).done(() => {

        })
      }
    }
    else {
      helperSignal.onReconnect(() => {
        if (!isGroupChat) {
          proxy.invoke('addMessagePrivate', user.ID, message).done(() => {

          })
        }
        else {
          proxy.invoke('addMessageToGroup', group.ID, group.Name, message).done(() => {

          })
        }
      });
    }
  }

  _renderSeparatorView(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.separator} />
    );
  }

  upload(source, response) {
    var groupName = (this.props.group ? this.props.group.Name : "");
    var chatId = (this.props.group ? "" + this.props.group.ID + "" : this.props.user.ID);
    var data = [
      { name: 'groupName', data: groupName },
      { name: 'chatId', data: chatId },
      { name: 'avatar', filename: 'avatar.png', data: response.data }
    ];
    uploadFile(data, this.props.loginReducerUser ? this.props.loginReducerUser.access_token : '')
      .then(res => {
        if (res && res.data) {
          var data = JSON.parse(res.data);
          if (!data.success) {
            Alert.alert('Thông báo', "Gửi ảnh thất bại vui lòng thử lại!");
          }
        }
        else {
          Alert.alert('Thông báo', "Gửi ảnh thất bại vui lòng thử lại!");
        }
        console.log(res)
      })
      .catch(err => {
        Alert.alert('Thông báo', "Gửi ảnh thất bại vui lòng thử lại!");
      })
  }

  pickImage() {
    pick(this.upload.bind(this));
  }

  render() {
    const { user, isGroupChat, group, loginReducerUser } = this.props;
    return (
      <View style={{flex:1}}>
      <Loading isShow={this.state.isLocalLoading} />
      <GiftedChat
        style={{ flex:1 }}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: loginReducerUser.userID,
        }}
        renderActions={() => {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.pickImage() }}>
              <IconVector name="upload" size={19}></IconVector>

            </TouchableOpacity>
          )
        }}
        renderAvatarOnTop={true}
        renderSeparator={(sectionID, rowID) => this._renderSeparatorView(sectionID, rowID)}
      />
      
      </View>
    )
  }
}
export default ChatScreenComponent
