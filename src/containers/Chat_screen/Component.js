import React, { Component } from 'react'
import { View } from 'react-native'

import MessagesList from './MessagesList'
import MessageForm from './MessageForm'
import { proxy } from '../../helper/signalr';
import styles from './Styles'
class ChatScreenComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }
  render() {
    const { user,isGroupChat,group } = this.props;
    return (
      <View style={styles.container}>
        <MessagesList user={user} group={group} isGroupChat={isGroupChat}/>
        <MessageForm user={user} group={group} isGroupChat={isGroupChat}/>
      </View>
    )
  }
}
export default ChatScreenComponent
