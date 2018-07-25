import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import ChatScreen from './Component'
//import LogoutButton from './LogoutButton'

class ChatScreenContainer extends Component {

  constructor(props) {
    super(props);
    
  }
  static navigationOptions = ({ navigation }) => ({

    title: typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.title) === 'undefined' ? 'Chat' : navigation.state.params.title,

  });



  componentDidMount() {
    if (this.props.user && this.props.user.FullName) {
      this.props.navigation.setParams({ title: this.props.user.FullName })
    }
  }

  render() {
    const { user, isGroupChat, group,loginReducer } = this.props;
    return (
      <ChatScreen user={user} loginReducerUser={loginReducer.user} group={group} isGroupChat={isGroupChat} />
    )
  }
}
const mapStateToProps = state => ({
  chatScreenReducer: state.chatScreenReducer,
  loginReducer: state.loginReducer
  // sending: state.chat.sending,
  // sendingError: state.chat.sendingError,
  // message: state.chat.message
})


// function mapToDispatch(dispatch) {
//   return {
//     //chatScreen_action: bindActionCreators(chatScreen_action, dispatch)
//   };
// }

export default connect(mapStateToProps)(ChatScreenContainer)
