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
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <MessagesList user={user} />
        <MessageForm />
      </View>
    )
  }
}
export default ChatScreenComponent
