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
import * as profileAction from "../../store/actions/containers/profile_action";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { connection } from '../../helper/signalr';
import * as loginAction from '../../authen/actions/login_action';
import User from '../../components/User';
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
        <User user={loginReducer.user}></User>
        <Grid style={{justifyContent:'center',alignItems:'flex-end'}}>
          <Col style={{marginBottom:10,paddingLeft:10,paddingRight:10}}> 
            <Button block bordered  onPress={() => { fcmClient.removeFcmTokenServer(loginReducer.user); loginAction.logout(); Actions.reset('login') }}>
              <Text>Đăng xuất</Text>
            </Button>
          </Col>
        </Grid>
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
