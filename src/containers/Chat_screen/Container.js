import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { View, Text } from 'react-native';
import {Container} from 'native-base';
import ChatScreen from './Component'
import styles from "./Styles";
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
    const { user, isGroupChat, group, loginReducer } = this.props;
    const {
      signalrDisconnect,
      signalrReconnecting,
    } = this.props.homeReducer;
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
        <ChatScreen user={user} style={{ flex: 1 }} loginReducerUser={loginReducer.user} group={group} isGroupChat={isGroupChat} />
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  chatScreenReducer: state.chatScreenReducer,
  loginReducer: state.loginReducer,
  homeReducer: state.homeReducer
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
