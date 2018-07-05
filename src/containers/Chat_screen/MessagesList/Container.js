import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as chatScreen_action from '../../../store/actions/containers/chatScreen_action';
import { proxy } from '../../../helper/signalr';
import MessageListComponent from './Component'

class MessagesListContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages:[]
    };
    proxy.on('messagePrivates', (messages, userId) => {
      console.log('List Messages: ', messages);
      this.setState({ messages: messages });
    })
  }
  componentDidMount() {
    //this.props.loadMessages()
    const {user}=this.props;
    proxy.invoke('getAllMessagePrivate', user.ID);
  }

  render() {
    const { props } = this;
    //const data = getChatItems(props.chatScreenReducer.messages).reverse();
    return (
      <MessageListComponent
        data={this.state.messages} />
    )
  }
}

const getChatItems = data => {
  return data ? Object.keys(data).map(key => data[key]) : []
}

const mapStateToProps = state => ({
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
