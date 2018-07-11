import React, { Component,PureComponent } from 'react'
import PropTypes from 'prop-types'

import MessageRow from './Component'

//import firebaseService from '../../../../../services/firebase'

class MessageRowContainer extends PureComponent {

  render() {
    const {cUser,group}=this.props;
    let isCurrentUser=null;
    debugger
    if(!group){
      isCurrentUser = this.props.message.ReceiveID==cUser.ID;
    }
    else{
      isCurrentUser = this.props.message.FromID==cUser.userID;
    }
    return (
      <MessageRow
        message={this.props.message}
        isCurrentUser={isCurrentUser}/>
    );
  }
}

// MessageRowContainer.propTypes = {
//   message: PropTypes.object.isRequired,
// }

export default MessageRowContainer
