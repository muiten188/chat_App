import React, { Component } from 'react'

import ChatScreen from './Component'
//import LogoutButton from './LogoutButton'

class ChatScreenContainer extends Component {

  static navigationOptions = ({ navigation }) => ({

    title: typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.title) === 'undefined' ? 'Chat' : navigation.state.params.title,

  });


  componentDidMount() {
    if (this.props.user && this.props.user.FullName) {
      this.props.navigation.setParams({ title: this.props.user.FullName })
    }
  }

  render() {
    const { user, isGroupChat, group } = this.props;
    return (
      <ChatScreen user={user} group={group} isGroupChat={isGroupChat} />
    )
  }
}

export default ChatScreenContainer
