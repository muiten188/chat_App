import React, { Component } from 'react'

import ChatScreen from './Component'
//import LogoutButton from './LogoutButton'

class ChatScreenContainer extends Component {

  static navigationOptions = {
    title: 'chat',
    // headerRight: <LogoutButton />
  }

  render() {
    const { user } = this.props;
    return (
      <ChatScreen user={user}/>
    )
  }
}

export default ChatScreenContainer
