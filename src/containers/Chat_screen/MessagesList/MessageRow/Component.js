import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'

import styles from './Styles'
import I18n from "../../../../i18n/i18n";

const MESSAGE_TEXT_MARGIN = 50

const MessageRowComponent = props => {
  const isCurrentUser = props.isCurrentUser
  const alignItems = isCurrentUser ? 'flex-end' : 'flex-start'
  const margin = isCurrentUser ? { marginLeft: MESSAGE_TEXT_MARGIN } : { marginRight: MESSAGE_TEXT_MARGIN }
  const username = isCurrentUser ? I18n.t("you", {
    locale: "vn"
  }) : props.message.FromFullName
  const date = relativeDate(new Date(props.message.CreatedDate))//props.message.createdAt
  return (
    <View
      style={styles.container}>
      <View
        style={[isCurrentUser ? styles.bubbleView_me : styles.bubbleView_friend, { alignItems: alignItems }, margin]}>
        <Text
          style={isCurrentUser ? styles.userText_me : styles.userText_friend} >
          {date + ' - ' + username}
        </Text>
        <Text
          style={isCurrentUser ? styles.messageText_me : styles.messageText_friend}>
          {props.message.Content}
        </Text>
      </View>
    </View>
  )
}

// MessageRowComponent.propTypes = {
//   isCurrentUser: PropTypes.bool.isRequired,
//   message: PropTypes.shape({
//     createdAt: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//     user: PropTypes.shape({
//       email: PropTypes.string.isRequired
//     })
//   })
// }

export default MessageRowComponent
