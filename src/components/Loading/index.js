import React, { Component } from "react";
import { Spinner } from "native-base";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempShow: false
    };
  }

  render() {
    const { isShow } = this.props;
    const { tempShow } = this.state;
    return (
      <View style={tempShow || isShow ? styles.spin_Container : {}}>
        {tempShow || isShow ? <Spinner color="#054f9a" /> : null}
      </View>
    );
  }

  tempShow() {
    this.setState({ tempShow: true }, () => {
      setTimeout(() => {
        this.setState({ tempShow: false });
      }, 0);
    });
  }

  show() {
    this.setState({ tempShow: true });
  }

  hide() {
    this.setState({ tempShow: false });
  }

  getState(){
    return this.state.tempShow;
  }
}
