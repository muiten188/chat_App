import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types'
import * as chatScreen_action from '../../../store/actions/containers/chatScreen_action';


import MessageForm from './Component'

class MessageFormContainer extends Component {
  constructor(props) {
    super(props);
    // I18n.defaultLocale = "vi";
    // I18n.locale = "vi";
    // I18n.currentLocale();
  }
  render() {
    const { props } = this;
    return (
      <MessageForm
        isGroupChat={props.isGroupChat}
        group={props.group}
        user={props.user}
        sending={props.chatScreenReducer.sending}
        sendMessage={props.chatScreen_action.sendMessage}
        updateMessage={props.chatScreen_action.updateMessage}
        message={props.chatScreenReducer.message}
        sendingError={props.chatScreenReducer.sendingError} />
    )
  }
}

const mapStateToProps = state => ({
  chatScreenReducer: state.chatScreenReducer//,
  // sending: state.chat.sending,
  // sendingError: state.chat.sendingError,
  // message: state.chat.message
})


function mapToDispatch(dispatch) {
  return {
    chatScreen_action: bindActionCreators(chatScreen_action, dispatch)
  };
}

// MessageFormContainer.propTypes = {
//   sending: PropTypes.bool.isRequired,
//   sendMessage: PropTypes.func.isRequired,
//   updateMessage: PropTypes.func.isRequired,
//   message: PropTypes.string.isRequired,
//   sendingError: PropTypes.string
// }

export default connect(mapStateToProps, mapToDispatch)(MessageFormContainer)
