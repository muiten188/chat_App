import React, { Component,PureComponent } from 'react'
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'
import * as appConfig from '../../../../config/app_config';
import styles from './Styles'
import I18n from "../../../../i18n/i18n";
import ImageViewer from 'react-native-image-zoom-viewer';
import { Fab, Thumbnail } from 'native-base';
import { Grid, Col, Row } from "react-native-easy-grid";
import * as helperSignal from '../../../../helper/signalr';
const resolveAssetSource = require('resolveAssetSource');
const userAvar = require("../../../../resources/assets/user.jpg")
const MESSAGE_TEXT_MARGIN = 50
class MessageRowComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowPreview: false
    };
  }
  render() {
    const { props } = this;
    const isCurrentUser = props.isCurrentUser
    const alignItems = isCurrentUser ? 'flex-end' : 'flex-start'
    const margin = isCurrentUser ? { marginLeft: MESSAGE_TEXT_MARGIN } : { marginRight: MESSAGE_TEXT_MARGIN }
    const username = isCurrentUser ? I18n.t("you", {
      locale: "vn"
    }) : props.message.FromFullName
    var isShowAvar = true;
    // if (helperSignal.currentIdChat != props.message.ReceiveID) {
    //   isShowAvar = true;
    //   helperSignal.currentIdChat = props.message.ReceiveID
    // }
    // debugger
    const date = relativeDate(new Date(props.message.CreatedDate))//props.message.createdAt
    var urlImage = "";
    let images = [];
    if (props.message.IsFile) {
      urlImage = appConfig.API_HOST_NO + props.message.Content;
      images = [{
        // Simplest usage.
        url: urlImage,
        // You can pass props to <Image />.
        props: {
          // headers: ...
        }
      }]
    }
    var avartarUrl = null;
    if (props.cUser && props.cUser.Avatar) {
      avartarUrl = `${appConfig.API_HOST_NO}${props.cUser.Avatar}`;
    }
    return (
      <View
        style={[styles.container, isCurrentUser ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
        <Grid>
          <Col style={{ width: 40 }}>
            {!isCurrentUser && isShowAvar ?
              <Thumbnail style={styles.avartar} small source={{ uri: avartarUrl ? avartarUrl : 'http://images6.fanpop.com/image/photos/40600000/PRISTIN-WE-LIKE-Promotion-Nayoung-pristin-40694319-500-333.jpg' }} />
              : null}
          </Col>
          <Col>
            <View
              style={[isCurrentUser ? styles.bubbleView_me : styles.bubbleView_friend, { alignItems: alignItems }, margin]}>
              <Text
                style={isCurrentUser ? styles.userText_me : styles.userText_friend} >
                {date + ' - ' + username}
              </Text>
              {props.message.IsFile ?
                <TouchableOpacity onPress={() => {
                  this.setState({ isShowPreview: true })
                }}>
                  <View style={{ height: 100, width: 130, borderWidth: 0.5, borderColor: '#cecece', borderRadius: 3 }}>
                    <Image style={{ flex: 1, resizeMode: 'stretch', borderRadius: 3 }} source={props.message.Content ? { uri: urlImage } : userAvar} />
                  </View></TouchableOpacity>
                : <Text
                  style={isCurrentUser ? styles.messageText_me : styles.messageText_friend}>
                  {props.message.Content}
                </Text>}

            </View>
          </Col>
        </Grid>

        <Modal visible={this.state.isShowPreview} transparent={true} onRequestClose={() => { this.setState({ isShowPreview: false }) }}>
          <ImageViewer imageUrls={images}
            failImageSource="ko load được ảnh"
            renderIndicator={(currentIndex, allSize) => { }}
          />
        </Modal>
      </View>
    )
  }
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
