import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput
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
  H3,
  Icon,
  Card, CardItem, Right
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import * as changePasswordAction from "../../store/actions/containers/changePassword_action";
import IconVector from "react-native-vector-icons/Ionicons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { Field, reduxForm } from "redux-form";
import { InputField } from "../../components/Element/Form";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { connection } from '../../helper/signalr';
import * as loginAction from '../../authen/actions/login_action';
import * as AppConfig from "../../config/app_config";
import User from '../../components/User';
import fcmClient from '../../helper/fcmClient';

const validate = values => {
  const error = {};
  error.username = "";
  error.password = "";
  error.confirmPassword = "";
  var username = values.username;
  var password = values.password;
  var confirmPassword = values.confirmPassword;

  if (values.username === undefined) {
    username = "";
  }
  if (values.password === undefined) {
    password = "";
  }
  if (values.confirmPassword === undefined) {
    confirmPassword = "";
  }
  if (username.length == 0 || username == "") {
    error.username = "trống";
  }
  if (password.length == 0 || password == "") {
    error.password = "trống";
  }
  if (confirmPassword.length == 0 || confirmPassword == "") {
    error.confirmPassword = "trống";
  }
  if (confirmPassword !== password) {
    error.confirmPassword = "không khớp";
  }
  return error;
};

class ChangePassword extends Component {

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

  onHandleSubmit(value) {
    const { changePasswordAction } = this.props;
    const { user } = this.props.loginReducer;
    changePasswordAction.changePassword(value, user)
  }

  componentDidUpdate() {
    const { changePwDone } = this.props.changePasswordReducer;
    const {changePasswordAction} = this.props;
    if (changePwDone) {
      Alert.alert('Thông báo', 'Thay đổi mật khẩu thành công', [{
        text: 'Ok',
        onPress: (e) => {
          changePasswordAction.resetChangePassword();
          Actions.pop();
        }
      }],
        { cancelable: false });
    }
  }

  render() {
    const locale = "vn";
    const { loginAction, loginReducer, handleSubmit, changePasswordAction } = this.props;
    const {changePwing}=this.props.changePasswordReducer;
    var avartarUrl = null;
    if (loginReducer.user && loginReducer.user.avartar) {
      avartarUrl = `${AppConfig.API_HOST_NO}${loginReducer.user.avartar}`;
    }
    return (
      <Container style={styles.container}>
        <View style={styles.headerProfile}>
          <View style={styles.headerProfile_Inside} />
          <Grid>
            <Col style={{ width: 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
              <Button transparent full onPress={() => {
                Actions.pop();
              }}>
                <IconVector name="md-close" color={'#fff'} size={28}></IconVector>
              </Button>
            </Col>
            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ marginTop: 40 }}>
                <Thumbnail style={{ marginLeft: -50, width: 95, height: 95, borderRadius: 50 }} source={{ uri: avartarUrl ? avartarUrl : 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
                <View style={{
                  position: 'absolute',
                  right: 2,
                  bottom: 2,
                  height: 18,
                  width: 18,
                  backgroundColor: '#94d82d',
                  borderRadius: 40,
                  borderWidth: 2,
                  borderColor: '#fff'
                }} />
              </View>
            </Col>
          </Grid>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={-250} behavior="padding" enabled>
          <Content>
            <Grid>
              <Row style={{ marginTop: 30, height: 60, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <H2>{loginReducer.user ? loginReducer.user.fullName : ''}</H2>

              </Row>
              <Row style={{ height: 300, width: '100%' }}>
                <Form style={styles.form}>
                  <View style={styles.item}>
                    <Field
                      icon="user-circle-o"
                      name="username"
                      disabled={true}
                      placeholder={I18n.t("account", {
                        locale: locale ? locale : "vi"
                      })}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    <Field
                      icon="key"
                      name="password"
                      placeholder={I18n.t("newpassword", {
                        locale: locale ? locale : "vi"
                      })}
                      secureTextEntry={true}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    <Field
                      icon="key"
                      name="confirmPassword"
                      placeholder={I18n.t("confirmPassword", {
                        locale: locale ? locale : "vi"
                      })}
                      secureTextEntry={true}
                      component={InputField}
                    />
                  </View>
                  <Button
                    full
                    style={[styles.buttonLogin, { backgroundColor: '#007db7' }]}
                    onPress={handleSubmit(this.onHandleSubmit.bind(this))}
                  >
                    <Text>
                      Đổi mật khẩu
              </Text>
                  </Button>
                </Form>
              </Row>
            </Grid>
          </Content>
        </KeyboardAvoidingView>
        <Loading isShow={changePwing} />
      </Container>
    );
  }


}
function mapStateToProps(state, props) {
  return {
    changePasswordReducer: state.changePasswordReducer,
    loginReducer: state.loginReducer,
    initialValues: state.changePasswordReducer.userForm
      ? state.changePasswordReducer.userForm
      : {
        username: state.loginReducer.user.username,//"bachbd"
        password: "",//"123456a@"
        confirmPassword: ""//'123456a@'
      }
  };
}
function mapToDispatch(dispatch) {
  return {
    changePasswordAction: bindActionCreators(changePasswordAction, dispatch),
    loginAction: bindActionCreators(loginAction, dispatch),
  };
}
ChangePassword = reduxForm({
  form: "LoginForm",
  validate,
  enableReinitialize: true
})(ChangePassword);
ChangePassword = connect(mapStateToProps, mapToDispatch)(ChangePassword);
export default ChangePassword;