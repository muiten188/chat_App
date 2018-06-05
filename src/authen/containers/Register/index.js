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
const username = "";
const password = "";

const validate = values => {
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
    error.username = "empty";
  }
  if (password.length == 0 || password == "") {
    error.password = "empty";
  }
  return error;
};

class register extends Component {
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

  componentDidMount() {
    const { loginAction } = this.props;
    const { loginReducer } = this.props;
    try {
      const hadUser = AsyncStorage.getItem("@userLogin")
        .then(value => {
          let userLogin = JSON.parse(value);
          if (userLogin && loginReducer.Logout) {
            loginAction.setFormLogin(userLogin);
          } else if (
            userLogin &&
            userLogin.username != "" &&
            userLogin.password != ""
          ) {
            loginAction.setFormLogin(userLogin);
            loginAction.login(userLogin);
          }
        })
        .done();
    } catch (error) {
      //error
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
    if (
      loginReducer.Logged != null &&
      loginReducer.Logged == false &&
      loginReducer.Loging == false
    ) {
      Alert.alert("Thông báo", "Đăng nhập thất bại");
      loginReducer.Logged = null;
    }

    return (
      <View style={{ flex: 1 }}>
        <Loading isShow={loginReducer.Loging} />
        {/* background */}
        <Image
          source={require("../../../resources/assets/splashm.png")}
          style={styles.backgroundImage}
        />
        {/* ngôn ngữ */}
        <Grid style={styles.language_container}>
          <Col style={styles.col_language}>
            {this.state.languageSelect == "en" ? (
              <Thumbnail
                small
                source={require("../../../resources/assets/us_flag.svg")}
              />
            ) : (
                <Thumbnail
                  small
                  source={require("../../../resources/assets/vn_flag.svg")}
                />
              )}
          </Col>
          <Col>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              style={{color:'#fff'}}
              selectedValue={this.state.languageSelect}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="Tiếng việt" value="vn" />
              {/* <Item label="English" value="en" /> */}
            </Picker>
          </Col>
        </Grid>
        {/* form login */}
        <View style={styles.screen}>
          <View style={styles.loginform}>
            <Container style={styles.container_login}>
              <View style={styles.content_login}>
                <View>
                  {/* <Thumbnail square large source={require("../../../resources/assets/splash.png")} /> */}
                  <View style={styles.app_icon}>
                    {/* <Thumbnail
                      square
                      large
                      source={{
                        uri:
                          "https://3.bp.blogspot.com/-9FS5zPnrtrQ/WdjintM17tI/AAAAAAAAHuc/qnzExAUr9O036AxE35tky5Bm-1BmB-qYgCLcBGAs/s320/y-nghia-icon-facebook-zalo.png"
                      }}
                    /> */}
                  </View>
                  <Form style={styles.form}>
                    <Item regular style={styles.item}>
                      {/* <Icon active name="person" /> */}
                      <Field
                        icon="user-circle-o"
                        name="username"
                        placeholder={I18n.t("account", {
                          locale: locale ? locale : "vi"
                        })}
                        component={InputField}
                      />
                    </Item>
                    <Item regular style={styles.item}>
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
                    </Item>
                    <Button
                      full
                      style={{ marginTop: 20 }}
                      onPress={handleSubmit(loginAction.login)}
                    >
                      <Text>
                        {I18n.t("register", {
                          locale: this.state.languageSelect
                            ? this.state.languageSelect
                            : "vi"
                        })}
                      </Text>
                    </Button>
                    <Button transparent dark full
                      onPress={() => Actions.login()}>
                      <Text uppercase={false} x>
                        {I18n.t("login", {
                          locale: this.state.languageSelect
                            ? this.state.languageSelect
                            : "vi"
                        })}
                      </Text>
                    </Button>
                  </Form>
                  <Grid>
                    {/* <Col style={styles.col_footer}>
                      <Text style={[styles.text_footer, { textAlign: "left" }]}>
                        Hotline: 0243 333 888
                      </Text>
                    </Col> */}
                    <Row style={styles.col_footer}>
                      <Text
                        style={[styles.text_footer, { textAlign: "right" }]}
                      >

                      </Text>
                    </Row>
                  </Grid>
                </View>
              </View>
            </Container>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loginReducer: state.loginReducer,
    initialValues: state.loginReducer.userForm
      ? state.loginReducer.userForm
      : {
        username: "",
        password: ""
      }
  };
}
function mapToDispatch(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}

register = reduxForm({
  form: "LoginForm",
  validate,
  enableReinitialize: true
})(register);
register = connect(mapStateToProps, mapToDispatch)(register);
export default register;
