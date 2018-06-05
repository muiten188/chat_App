import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  Button,
  Item,
  Footer,
  Left,
  Right,
  Content,
  H1,
  H2,
  H3
} from "native-base";
import styles from "./styles";
import Modal from "react-native-modal";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, onClose, textContent,onProcess } = this.props;
    return (
      <Modal isVisible={show} style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <H2>{textContent ? textContent : "Bạn có muốn thực hiện?"}</H2>
          </View>
          <Footer style={styles.Footer}>
            <Item style={styles.border_bottomNone}>
              <Button
                onPress={onClose}
                style={[styles.buttonOk, styles.button_margin]}
              >
                <Text style={[styles.textSize, styles.textCancel]}>
                  Quay lại
                </Text>
              </Button>
              <Button onPress={onProcess} style={styles.buttonCancel}>
                <Text style={[styles.textSize, styles.textOk]}>Đồng ý</Text>
              </Button>
            </Item>
          </Footer>
        </View>
      </Modal>
    );
  }
}
