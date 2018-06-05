import React, { Component } from "react";
import { Text, Item, Input } from "native-base";
import { View, Picker } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import User from "../User";
import I18n from "../../i18n/i18n";
const currentDate = new Date();
export default class extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { locale = "vn" } = this.props;
    const { onChange } = this.props;
    const { state } = this;
    return (
      <Item>
        
        <Button transparent onPress={onClear ? onClear : () => {}}>
          <Icon name="times" />
        </Button>
      </Item>
    );
  }
}
