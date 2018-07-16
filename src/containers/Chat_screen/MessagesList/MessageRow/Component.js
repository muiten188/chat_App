import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'
import * as appConfig from '../../../../config/app_config';
import styles from './Styles'
import I18n from "../../../../i18n/i18n";
const resolveAssetSource = require('resolveAssetSource');
const userAvar = require("../../../../resources/assets/user.jpg")
const MESSAGE_TEXT_MARGIN = 50

const MessageRowComponent = props => {
  const isCurrentUser = props.isCurrentUser
  const alignItems = isCurrentUser ? 'flex-end' : 'flex-start'
  const margin = isCurrentUser ? { marginLeft: MESSAGE_TEXT_MARGIN } : { marginRight: MESSAGE_TEXT_MARGIN }
  const username = isCurrentUser ? I18n.t("you", {
    locale: "vn"
  }) : props.message.FromFullName
  const date = relativeDate(new Date(props.message.CreatedDate))//props.message.createdAt
  var urlImage = "";
  if (props.message.IsFile) {
    urlImage = appConfig.API_HOST_NO + props.message.Content;
  }
  return (
    <View
      style={[styles.container,isCurrentUser ?{justifyContent:'flex-end'}:{justifyContent:'flex-start'}]}>
      <View
        style={[isCurrentUser ? styles.bubbleView_me : styles.bubbleView_friend, { alignItems: alignItems },margin]}>
        <Text
          style={isCurrentUser ? styles.userText_me : styles.userText_friend} >
          {date + ' - ' + username}
        </Text>
        {props.message.IsFile ?
          <View style={{ height: 100, width: 130,borderWidth:0.5,borderColor:'#cecece',borderRadius:3 }}>
            <Image style={{ flex: 1, resizeMode: 'stretch',borderRadius:3 }} source={props.message.Content?{ uri: urlImage }: userAvar} />
          </View>
          : <Text
            style={isCurrentUser ? styles.messageText_me : styles.messageText_friend}>
            {props.message.Content}
          </Text>}

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
