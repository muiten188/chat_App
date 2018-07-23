import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  Container,
  Text,
  Button,
  Content,
  Body,
  Thumbnail,
  Form,
  Item,
  Input,
  H1,
  H2,
  H3
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as profileAction from "../../store/actions/containers/profile_action";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { connection } from '../../helper/signalr';
import * as loginAction from '../../authen/actions/login_action';
const blockAction = false;
const blockLoadMoreAction = false;
import fcmClient from '../../helper/fcmClient';
class Profile extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const locale = "vn";
    const { loginAction, loginReducer } = this.props;
    return (
      <Container style={styles.container}>
        <Text>{loginReducer.user ? loginReducer.user.username : 'name'}</Text>
        <Button onPress={() => { fcmClient.removeFcmTokenServer(loginReducer.user);loginAction.logout(); Actions.reset('login') }}>
          <Text>Đăng xuất</Text>
        </Button>
      </Container>
    );
  }


}
function mapStateToProps(state, props) {
  return {
    profileReducer: state.profileReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    profileAction: bindActionCreators(profileAction, dispatch),
    loginAction: bindActionCreators(loginAction, dispatch),
  };
}

Profile = connect(mapStateToProps, mapToDispatch)(Profile);
export default Profile;
