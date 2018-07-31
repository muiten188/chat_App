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
import Loading from "../../components/Loading";
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
      listUsers: [],
      _listUsers: null
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

  filterSearch(value) {
    let { listUsers } = this.state;
    if (value != '') {
      var _listUsers = listUsers.filter(user => user.FullName.toLowerCase().indexOf(value.toLowerCase()) != -1)
      this.setState({
        _listUsers: _listUsers,
      })
    }
    else {
      this.setState({
        _listUsers: null,
      })
    }
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
                  this.filterSearch(value);
                }}></Input>
            </Item>
          </Row>
          <Row style={{ height: 90 }}>
            <Col style={{ width: 90, alignItems: 'center', justifyContent: 'center' }}>
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
            <Col style={{ width: 90, alignItems: 'center', justifyContent: 'center' }}>
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
          <Row style={{ paddingBottom: 10 }}>
            <Loading isShow={this.state.listUsers && this.state.listUsers.length == 0} />
            <FlatList
              ref={ref => {
                this.list = ref;
              }}
              style={styles.listResult}
              data={this.state._listUsers ? this.state._listUsers : this.state.listUsers}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderFlatListItem.bind(this)}
              numColumns={1}
              onEndReachedThreshold={0.7}
            />
          </Row>
        </Grid>
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
            <Thumbnail style={styles.avartar} source={{ uri: avartarUrl ? avartarUrl : 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
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
