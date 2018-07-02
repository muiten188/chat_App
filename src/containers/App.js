import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert
} from "react-native";
import { Container } from "native-base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { Router, Scene, Actions } from 'react-native-router-flux';
import RootNavigaion from "../routers/root_navigation";
import * as appAction from "../store/actions/app_action";
import PropTypes from 'prop-types';
import * as helper from '../helper/signalr';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loged: false
    };
    helper.connectSignalr();
  }

  render() {
    let { loginReducer, appAction } = this.props;
    if (loginReducer.Logout == true) {
      AsyncStorage.setItem("@user", "");
    } else if (
      loginReducer.authen_expri == true &&
      loginReducer.Logged == true
    ) {
      Alert.alert(
        "Thông báo",
        "Phiên làm việc của bạn đã hết vui lòng đăng nhập lại."
      );
    } else if (loginReducer.Logged == true) {
      try {
        AsyncStorage.setItem("@user", JSON.stringify(loginReducer.user));
      } catch (error) {
        // //console.log("save error");
      }
    }
    return (
      <RootNavigaion />
    );
  }
  _closePayInfo() {
    const { appAction } = this.props;
    appAction.closePayInfo();
  }
  _clearPayListError() {
    const { appAction } = this.props;
    appAction.clearPayListError();
  }
}

App.propTypes ={
  appAction:PropTypes.object,
  app_Reducer:PropTypes.object,
  loginReducer:PropTypes.object
}

function mapStateToProps(state, props) {
  return {
    loginReducer: state.loginReducer,
    app_Reducer: state.app_Reducer
  };
}
function mapToDispatch(dispatch) {
  return {
    appAction: bindActionCreators(appAction, dispatch)
  };
}
export default connect(mapStateToProps, mapToDispatch)(App);
