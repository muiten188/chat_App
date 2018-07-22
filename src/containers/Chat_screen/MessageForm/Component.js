import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import PropTypes from 'prop-types'
import pick from '../../../helper/image_picker';
import uploadFile from '../../../helper/upload_image';
import I18n from "../../../i18n/i18n";
import IconVector from 'react-native-vector-icons/FontAwesome';
import styles from './Styles'
import { Icon } from 'native-base';

const OPACITY_ENABLED = 1.0
const OPACITY_DISABLED = 0.2

class MessageFormComponent extends Component {

  constructor(props) {
    super(props)
    this.handleMessageChange = (message) => {
      this.props.updateMessage(message)
    }

    this.handleButtonPress = () => {

      this.props.sendMessage(this.props.message, this.props.isGroupChat ? this.props.group : this.props.user, this.props.isGroupChat)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.sendingError && this.props.sendingError) {
      Alert.alert('error', this.props.sendingError)
    }
  }

  upload(source, response) {
    var groupName = (this.props.group ? this.props.group.Name : "");
    var chatId = (this.props.group ? "" + this.props.group.ID + "" : this.props.user.ID);
    var data = [
      { name: 'groupName', data: groupName },
      { name: 'chatId', data: chatId },
      { name: 'avatar', filename: 'avatar.png', data: response.data }
    ];
    uploadFile(data, this.props.userAuthen ? this.props.userAuthen.access_token : '')
      .then(res => {
        debugger
        console.log(res)
      })
      .catch(err => {
        Alert.alert('Thông báo',"Gửi ảnh thất bại vui lòng thử lại!");
      })
  }

  pickImage() {
    pick(this.upload.bind(this));
  }

  render() {
    const sending = this.props.sending
    const isButtonDisabled = sending || this.props.message.trim().length == 0
    const opacity = isButtonDisabled ? OPACITY_DISABLED : OPACITY_ENABLED

    return (
      <View style={styles.container}>

        <TextInput
          style={styles.textInput}
          placeholder={
            I18n.t("message", {
              locale: "vn"
            })
          }
          returnKeyType='send'
          onChangeText={this.handleMessageChange}
          value={this.props.message}
          underlineColorAndroid={'transparent'} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => { this.pickImage() }}>
          <IconVector name="upload" size={25}></IconVector>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.handleButtonPress}
          disabled={isButtonDisabled}>

          <Image
            source={require('../../../resources/assets/ic_send.png')}
            style={{ opacity: opacity }} />

        </TouchableOpacity>

      </View>
    );
  }
}

// MessageFormComponent.propTypes = {
//   sending: PropTypes.bool.isRequired,
//   sendMessage: PropTypes.func.isRequired,
//   updateMessage: PropTypes.func.isRequired,
//   message: PropTypes.string.isRequired,
//   sendingError: PropTypes.string
// }

export default MessageFormComponent
