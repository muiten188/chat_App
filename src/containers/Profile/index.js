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
  H3,
  Icon,
  Card, CardItem, Right
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import * as profileAction from "../../store/actions/containers/profile_action";
import IconVector from "react-native-vector-icons/Ionicons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { connection } from '../../helper/signalr';
import * as loginAction from '../../authen/actions/login_action';
import { pick, camera } from '../../helper/image_picker';
import { uploadFileChangeAvartar } from '../../helper/upload_image';
import * as AppConfig from "../../config/app_config";
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

  upload(source, response) {
    alert('upload change avartar')
    const { loginReducer,profileAction } = this.props;
    var data = [
      { name: response.fileName,filename: response.fileName, data: response.data }
    ];
    uploadFileChangeAvartar(data, loginReducer ? loginReducer.user.access_token : '')
      .then(res => {
        if (res && res.data) {
          var data = JSON.parse(res.data);
          if (!data.data) {
            Alert.alert('Thông báo', "Thay đổi Avartar thất bại vui lòng thử lại!");
          }
          else if (data.data) {
            var avartarUrlNew=data.data;
            profileAction.changeAvartar(avartarUrlNew,loginReducer.user)
          }
        }
        else {
          Alert.alert('Thông báo', "Thay đổi Avartar thất bại vui lòng thử lại!");
        }
        console.log(res)
      })
      .catch(err => {
        Alert.alert('Thông báo', "Thay đổi Avartar thất bại vui lòng thử lại!");
      })
  }

  pickImage() {
    pick(this.upload.bind(this));
  }

  render() {
    const locale = "vn";
    const { loginAction, loginReducer } = this.props;
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
              <TouchableOpacity
                onPress={() => { this.pickImage() }}
                style={{ marginLeft: -45, marginTop: 40 }}>
                <Thumbnail style={{ width: 95, height: 95, borderRadius: 50 }} source={{ uri: avartarUrl ? avartarUrl : 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
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
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
        <View style={{ marginTop: 30, height: 60, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <H2>{loginReducer.user ? loginReducer.user.fullName : ''}</H2>
          <View style={{ position: 'absolute', right: 0, height: '80%', width: 50 }}>
            <Button transparent full onPress={() => {
              Actions.changePassword();
            }}>
              <IconFontAwesome name="pencil" size={23}></IconFontAwesome>
            </Button>
          </View>
        </View>
        <View style={{ height: 300 }}>
          <Card>
            <CardItem header>
              <Text>PROFILE</Text>
            </CardItem>
            <CardItem>
              <IconFontAwesome style={{ width: 30 }} size={20} active name="address-card-o" />
              <Text style={styles.titleProfile}>  Tên truy cập</Text>
              <Right style={{ flex: 1 }}>
                <Text>{loginReducer.user ? loginReducer.user.username : ''}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <IconFontAwesome style={{ width: 30, paddingLeft: 5 }} active size={25} name="mobile" />
              <Text style={styles.titleProfile}>  Điện thoại</Text>
              <Right style={{ flex: 1 }}>
                <Text>-</Text>
              </Right>
            </CardItem>
            <CardItem>
              <IconFontAwesome style={{ width: 30 }} active size={20} name="birthday-cake" />
              <Text style={styles.titleProfile}>  Ngày sinh</Text>
              <Right style={{ flex: 1 }}>
                <Text>-</Text>
              </Right>
            </CardItem>
          </Card>
        </View>
        {/* <User style={{}} user={loginReducer.user}></User> */}
        <Grid style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
          <Col style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
            <Button block bordered onPress={() => {
              try {
                fcmClient.removeFcmTokenServer(loginReducer.user);
                loginAction.logout();
                if (connection) {
                  connection.logging = false;
                  connection.stop();
                }
                Actions.reset('login')
              }
              catch (e) {
                //error
              }
            }}>
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
