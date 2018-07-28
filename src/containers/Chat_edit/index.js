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
  CheckBox
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import Icon from "react-native-vector-icons/FontAwesome";
import * as chatEditAction from "../../store/actions/containers/chatEdit_action";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { connection, proxy } from '../../helper/signalr';
import HeaderContent from "../../components/Header_content";
import * as appConfig from '../../config/app_config';
class Profile extends Component {

  static navigationOptions = {
    title: "Chat mới",
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0.7,
      borderBottomColor: '#dadadc'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupNameSearch: '',
      listUsers: []
    }
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {
    try {
      this.onEventSignal();
      if (proxy.connection.state == 1) {
        proxy.invoke("loadAllContact");
      }
      else {
        helperSignal.onReconnect(() => {
          proxy.invoke("loadAllContact");
        });
      }
    }
    catch (err) {

    }
  }

  onEventSignal() {
    var self = this;
    proxy.on('allUser', (users) => {
      console.log('List Users: ', users);
      self.setState({
        listUsers: users,
      });
    })
  }

  componentWillUnmount() {
    proxy.off('allUser');
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const locale = "vn";
    const { chatEditAction, loginReducer } = this.props;
    return (
      <Container style={styles.container}>
        {/* <HeaderContent  /> */}
        <Grid>
          <Row style={{
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 25,
            paddingRight: 25,
          }}>
            <Item style={{ height: 40, width: '100%' }} rounded>
              <Icon name="search" style={{ paddingLeft: 10 }} size={18}></Icon>
              <Input
                height={40}
                style={{
                  textAlign: 'center',
                  marginLeft: -15
                }}
                placeholder={"Tìm kiếm"}
                value={this.state.groupNameSearch}
                onChangeText={(value) => {
                  this.setState({ groupNameSearch: value })
                }}></Input>
            </Item>
          </Row>
          <Row style={{ height: 90 }}>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  Actions.groupEdit();
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Icon name="group" size={20} style={{}}></Icon>
              </TouchableOpacity>
              <Text>Nhóm mới</Text>
            </Col>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => {

                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}><Icon name="phone" size={20} style={{}}></Icon></TouchableOpacity>
              <Text>Cuộc gọi</Text>
            </Col>
            <Col>
            </Col>
          </Row>
          <Row style={{ paddingBottom: 60 }}>
            <FlatList
              ref={ref => {
                this.list = ref;
              }}
              style={styles.listResult}
              data={this.state.listUsers ? this.state.listUsers : []}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderFlatListItem.bind(this)}
              numColumns={1}
              onEndReachedThreshold={0.7}
            />
          </Row>
        </Grid>
        <TouchableOpacity
          onPress={() => {
            Actions.groupEdit();
          }}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: 50,
            bottom: 5,
            right: 10,
            backgroundColor: '#1686d7',
            justifyContent: 'center',
            alignItems: 'center'
          }}><Icon name="arrow-right" size={20} style={{ color: '#fff' }}></Icon></TouchableOpacity>
      </Container >
    );
  }

  _keyExtractor(item, index) {
    return index;
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    var avartarUrl = null;
    if (item.Avatar) {
      avartarUrl = `${appConfig.API_HOST_NO}${item.Avatar}`;
    }

    return (
      <TouchableOpacity
        key={item.index}
        style={
          styles.item_GroupUser
        }
        onPress={() => {
          var arrUserGroup = this.state.listUsersGroups;
          Actions.chatScreen({ user: item })
        }}
      >
        <Grid>
          <Col style={styles.colAvar}>
            <Thumbnail style={styles.avartar} source={{ uri: avartarUrl ? avartarUrl : 'http://images6.fanpop.com/image/photos/40600000/PRISTIN-WE-LIKE-Promotion-Nayoung-pristin-40694319-500-333.jpg' }} />
          </Col>
          <Col style={styles.colContent}>
            <Row>
              <Col style={styles.colUserMessage}>
                <Text style={styles.userName}>{item.FullName}</Text>
              </Col>
            </Row>
          </Col>
        </Grid>
      </TouchableOpacity>
    );
  }

}
function mapStateToProps(state, props) {
  return {
    chatEditReducer: state.chatEditReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    chatEditAction: bindActionCreators(chatEditAction, dispatch),
  };
}

Profile = connect(mapStateToProps, mapToDispatch)(Profile);
export default Profile;
