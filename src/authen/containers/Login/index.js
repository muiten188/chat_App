import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  AsyncStorage,
  Alert,
  NativeModules
} from "react-native";
import {
  Container,
  Spinner,
  Text,
  Button,
  Header,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Thumbnail,
  Picker,
  Left,
  Right
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import theme from "../../../themes/default/styles";
import * as loginAction from "../../actions/login_action";
import I18n from "../../../i18n/i18n";
import { Field, reduxForm } from "redux-form";
import { InputField } from "../../../components/Element/Form";
import Loading from "../../../components/Loading";
import { Actions } from "react-native-router-flux";

import * as helper from "../../../helper";
import PropTypes from 'prop-types';


const username = "";
const password = "";

const validateLogin = values => {
  const error = {};
  error.username = "";
  error.password = "";
  var username = values.username;
  var password = values.password;
  if (values.username === undefined) {
    username = "";
  }
  if (values.password === undefined) {
    password = "";
  }
  if (username.length == 0 || username == "") {
    error.username = "trống";
  }
  if (password.length == 0 || password == "") {
    error.password = "trống";
  }
  return error;
};

class login extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      languageSelect: "vn",
      selected1: "key1",
      results: {
        items: []
      }
    };
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();

  }

  componentWillMount() {
    
  }

  componentDidMount() {
    const { loginAction } = this.props;
    const { loginReducer } = this.props;
    helper.getAsyncStorage("@user", this.onLoginFromCache.bind(this));

  }
  onLoginFromCache(promise) {
    const { setUser } = this.props.loginAction;
    promise.done((value) => {
      var user = JSON.parse(value);
      if(value&&value!=''){
        setUser(user);
      }
    })
  }
  
  componentDidUpdate() {
    const { loginReducer } = this.props;
    if (
      loginReducer.Logged != null &&
      loginReducer.Logged == false &&
      loginReducer.Loging == false
    ) {
      Alert.alert("Thông báo", "Đăng nhập thất bại");
      loginReducer.Logged = null;
    }
    else if (loginReducer.Logged == true) {
      helper.setAsyncStorage("@user", loginReducer.user);
      Actions.reset('home');
    }
  }

  onValueChange(value) {
    this.setState({
      languageSelect: value
    });
  }

  render() {
    const { loginAction, handleSubmit, submitting, loginReducer } = this.props;
    const locale = "vn";
    return (
      <Container>

        <Loading isShow={loginReducer.Loging} />
        {/* background */}
        <Image
          source={require("../../../resources/assets/splash1.png")}
          style={[styles.backgroundImage]}
        />

        <View style={styles.screen}>
          <View style={styles.loginform}>
            <Grid style={{ width: '100%' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Form style={styles.form}>
                  <View style={styles.item}>
                    {/* <Icon active name="person" /> */}
                    <Field
                      icon="user-circle-o"
                      name="username"
                      placeholder={I18n.t("account", {
                        locale: locale ? locale : "vi"
                      })}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    {/* <Icon active name="lock" /> */}
                    <Field
                      icon="key"
                      name="password"
                      placeholder={I18n.t("password", {
                        locale: locale ? locale : "vi"
                      })}
                      secureTextEntry={true}
                      component={InputField}
                    />
                  </View>
                  <Button
                    full
                    style={[styles.buttonLogin, { backgroundColor: '#007db7' }]}
                    onPress={handleSubmit(loginAction.login)}
                  >
                    <Text>
                      {I18n.t("login", {
                        locale: this.state.languageSelect
                          ? this.state.languageSelect
                          : "vi"
                      })}
                    </Text>
                  </Button>
                  <Grid>
                    {/* <Col>
                      <Button transparent dark style={[styles.buttonLogin]}
                        onPress={() => {
                          Actions.register();
                        }}>
                        <Text uppercase={false} >
                          {I18n.t("register", {
                            locale: this.state.languageSelect
                              ? this.state.languageSelect
                              : "vi"
                          })}
                        </Text>
                      </Button>
                    </Col>
                    <Col size={1.5}>
                      <Button transparent dark style={[styles.buttonLogin]} >
                        <Text uppercase={false} x>
                          {I18n.t("forgotPassword", {
                            locale: this.state.languageSelect
                              ? this.state.languageSelect
                              : "vi"
                          })}
                        </Text>
                      </Button>
                    </Col> */}
                    <Row>
                      <Button transparent block dark style={[styles.buttonLogin]} >
                        <Text uppercase={false} x>
                          {I18n.t("forgotPassword", {
                            locale: this.state.languageSelect
                              ? this.state.languageSelect
                              : "vi"
                          })}
                        </Text>
                      </Button>
                    </Row>
                  </Grid>


                </Form>
              </Row>
              {/* <Row style={{ height: 50 }}>
                <Col style={{ paddingRight: 2 }}>
                  <Button block onPress={this._fbAuth.bind(this)} style={[styles.buttonLogin, styles.buttonLoginFb]}>
                    <Text>Facebook</Text>
                  </Button>
                </Col>
                <Col style={{ paddingLeft: 2 }}>
                  <Button block onPress={this._googleSignIn.bind(this)} style={[styles.buttonLogin, styles.buttonLoginGg]}  >
                    <Text>Google</Text>
                  </Button>
                </Col>
              </Row> */}
            </Grid>
            {/* <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._googleSignIn.bind(this)}
          /> */}
          </View>
        </View>

      </Container>
    );
  }
  //facebook call back
  responseInfoCallback(error, result) {
    const { loginAction } = this.props;
    if (error) {
      console.log(error)
      //alert('Error fetching data: ' + error.toString());
    } else {
      console.log(result)
      //alert('login :' + result.name)
      loginAction.login(result);
      //alert('Success fetching data: ' + result.toString());
    }
  }


}



login.propTypes = {
  loginAction: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  loginReducer: PropTypes.object
};

function mapStateToProps(state, props) {
  return {
    loginReducer: state.loginReducer,
    initialValues: state.loginReducer.userForm
      ? state.loginReducer.userForm
      : {
        username: "1@gmail.com",
        password: "111111"
      }
  };
}
function mapToDispatch(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}

login = reduxForm({
  form: "LoginForm",
  validate: validateLogin,
  enableReinitialize: true
})(login);
login = connect(mapStateToProps, mapToDispatch)(login);
export default login;
