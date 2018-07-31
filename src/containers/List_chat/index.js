import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl
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
import * as listChatAction from "../../store/actions/containers/listChat_action";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import HeaderContent from '../../components/Header_content';
import ItemChat from '../../components/Item_chat';

var EventEmitter = require('EventEmitter');

const blockAction = false;
const blockLoadMoreAction = false;
import ItemGroupChat from '../../components/Item_Group_chat';
import { proxy, connection } from '../../helper/signalr';
import * as helper from '../../helper';
import * as helperSignal from '../../helper/signalr';
import fcmClient from '../../helper/fcmClient';
class ListChat extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      listUsers: [],
      listGroups: [],
      _listUsers: null,
      _listGroups: null,
      isLocalLoading: true
    }

    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();

  }

  componentWillMount() {
    fcmClient.newEvent.addListener('fcm-event-user', () => {
      if (helperSignal.connection && helperSignal.connection.state == 1) {
        if (fcmClient.userID != null) {
          var oUser = null;
          if (fcmClient.userID == null) {
            return;
          }
          for (var i = 0; i < this.state.listUsers.length; i++) {
            var user = this.state.listUsers[i];
            if (user.ID == fcmClient.userID) {
              oUser = user;
              break;
            }
          }
          if (oUser != null) {
            fcmClient.userID = null;

            var s = Actions.currentScene;
            if (s != 'chatScreen') {
              Actions.chatScreen({ user: oUser })
            }
          }
        }
      }
    });
    fcmClient.newEvent.addListener('fcm-event-group', () => {
      if (helperSignal.connection && helperSignal.connection.state == 1) {

        if (fcmClient.groupID != null) {
          var oGroup = null;
          for (var i = 0; i < this.state.listGroups.length; i++) {
            var group = this.state.listGroups[i];
            if (group.ID == fcmClient.groupID) {
              oGroup = group;
              break;
            }
          }
          if (oGroup != null) {
            fcmClient.groupID = null;
            Actions.chatScreen({ user: this.props.loginReducer.user, group: oGroup, isGroupChat: true })
          }
        }
      }
    });
  }

  componentDidMount() {
    if (connection && connection.state == 1) {
      this.onEventSignal();
      try {
        proxy.invoke("loadAllContact");
        proxy.invoke("GetAllMessageUser");
        proxy.invoke('loadAllGroup');
      }
      catch (e) {

      }
      return;
    }
    if (this.props.loginReducer.user != null) {
      helperSignal.connectSignalr(this.props.loginReducer.user);
      this.onEventSignal();
      if (connection && connection.state == 1) {
        proxy.invoke('loadAllGroup');
      } else {
        helperSignal.onReconnect(() => {
          proxy.invoke('loadAllGroup');
        });
      }

    }
    else {
      helper.getAsyncStorage("@user", this.onConnectSignal.bind(this));
    }

  }
  componentWillUnmount(){
    try{
      proxy.off('allGroup');
      proxy.off('addCountMessageGroup');
      proxy.off('devCountMessageGroup');
      proxy.off('allUser');
      proxy.off('connect');
      proxy.off('disConnect');
      proxy.off('allMessageUser');
      proxy.off('devCountMessagePrivate');
      proxy.off('devCountMessagePrivate');
    }
    catch(e){
      //error
    }
  }

  onEventSignal() {
    var self = this;
    if (!proxy) {
      return;
    }
    //group
    proxy.on('allGroup', (groups, total) => {

      self.setState({
        listGroups: groups,
        isLocalLoading: false
      });
      if (helperSignal.connection && helperSignal.connection.state == 1) {

        if (fcmClient.groupID != null) {
          var oGroup = null;
          for (var i = 0; i < this.state.listGroups.length; i++) {
            var group = this.state.listGroups[i];
            if (group.ID == fcmClient.groupID) {
              oGroup = group;
              break;
            }
          }
          if (oGroup != null) {
            fcmClient.groupID = null;
            Actions.chatScreen({ user: this.props.loginReducer.user, group: oGroup, isGroupChat: true })
          }
        }
      }
    })
    proxy.on('addCountMessageGroup', (groupId) => {
      var listGroups = this.state.listGroups;
      for (var i = 0; i < listGroups.length; i++) {
        var group = listGroups[i];
        if (group.ID == groupId) {
          listGroups[i].Count = listGroups[i].Count + 1;
          break;
        }
      }
      self.setState({
        listGroups: listGroups,
      });
    })
    proxy.on('devCountMessageGroup', (groupId, count) => {
      if (count > 0) {
        var listGroups = this.state.listGroups;
        for (var i = 0; i < listGroups.length; i++) {
          var group = listGroups[i];
          if (group.ID == groupId) {
            listGroups[i].Count = 0;
            break;
          }
        }
        self.setState({
          listGroups: listGroups,
        });
      }
    })
    //user
    proxy.on('allUser', (users) => {
      console.log('List Users: ', users);
      self.setState({
        listUsers: users,
        isLocalLoading: false
      });
    })
    proxy.on('connect', (id, username, fullname, userID) => {
      var listUsers = self.state.listUsers;
      for (var i = 0; i < self.state.listUsers.length; i++) {
        var item = listUsers[i];
        if (item.ID == userID) {
          item.Connected = true;
          break;
        }
      }
      self.setState({
        listUsers: listUsers,
      });
    })
    proxy.on('disConnect', (username, fullname, userID) => {
      var listUsers = self.state.listUsers;
      for (var i = 0; i < self.state.listUsers.length; i++) {
        var item = listUsers[i];
        if (item.ID == userID) {
          item.Connected = false;
          break;
        }
      }
      self.setState({
        listUsers: listUsers,
      });
    })
    proxy.on('allMessageUser', (users, count) => {

      var listUsers = self.state.listUsers;
      for (var i = 0; i < self.state.listUsers.length; i++) {
        var oUser = listUsers[i];
        for (var j = 0; j < users.length; j++) {
          var itemY = users[j];
          if (oUser.ID == itemY.ID) {
            listUsers[i].CountNew = itemY.CountNew;
          }
        }
      }
      self.setState({
        listUsers: listUsers,
      });
      if (helperSignal.connection && helperSignal.connection != 4) {
        if (fcmClient.userID != null) {
          var oUser = null;
          if (fcmClient.userID == null) {
            return;
          }
          for (var i = 0; i < listUsers.length; i++) {
            var user = listUsers[i];
            if (user.ID == fcmClient.userID) {
              oUser = user;
              break;
            }
          }

          if (oUser != null) {
            fcmClient.userID = null;

            var s = Actions.currentScene;
            if (s != 'chatScreen') {
              Actions.chatScreen({ user: oUser })
            }
          }
        }
      }
    })
    proxy.on('devCountMessagePrivate', (userId, count) => {
      if (count > 0) {
        var listUsers = self.state.listUsers;
        for (var i = 0; i < self.state.listUsers.length; i++) {
          var oUser = listUsers[i];
          if (oUser.ID == userId) {
            listUsers[i].CountNew = 0;
            break;
          }
        }
        self.setState({
          listUsers: listUsers,
        });
      }
    })
  }

  onConnectSignal(promise) {
    promise.then((value) => {
      var user = JSON.parse(value);
      if (connection && connection.state == 1) {
        proxy.invoke("loadAllContact");
        proxy.invoke("GetAllMessageUser");
        proxy.invoke('loadAllGroup');

      } else {
        helperSignal.onReconnect(() => {
          proxy.invoke("loadAllContact");
          proxy.invoke("GetAllMessageUser");
          proxy.invoke('loadAllGroup');
        });
        //helperSignal.connectSignalr(user);
      }
      this.onEventSignal();
      this.props.loginReducer.user = user;
    }).catch((e) => {
      console.log("get cache failed!".e);
    });
  }

  componentDidUpdate(prevProps, prevState) {

  }

  filterSearch(value) {
    let { listUsers, listGroups } = this.state;
    if (value != '') {
      var _listUsers = listUsers.filter(user => user.FullName.toLowerCase().indexOf(value.toLowerCase()) != -1)
      var _listGroups = listGroups.filter(group => group.Name.toLowerCase().indexOf(value.toLowerCase()) != -1)
      this.setState({
        _listUsers: _listUsers,
        _listGroups: _listGroups
      })
    }
    else {
      this.setState({
        _listUsers: null,
        _listGroups: null
      })
    }
  }

  render() {
    const locale = "vn";
    return (
      <Container style={styles.container}>
        <Loading isShow={this.state.isLocalLoading} />
        <Item style={{ marginTop: 4, marginLeft: 6, marginRight: 6, height: 40, width: '97%' }} rounded>
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
              this.setState({ groupNameSearch: value });
              this.filterSearch(value);
            }}></Input>
        </Item>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={this.state.isLocalLoading}
              onRefresh={() => {
                if (connection && connection.state == 1) {
                  proxy.invoke("loadAllContact");
                  proxy.invoke("GetAllMessageUser");
                  proxy.invoke('loadAllGroup');

                } else {
                  helperSignal.onReconnect(() => {
                    proxy.invoke("loadAllContact");
                    proxy.invoke("GetAllMessageUser");
                    proxy.invoke('loadAllGroup');
                  });
                  //helperSignal.connectSignalr(user);
                }
              }}
            />
          }
          style={styles.listResult}
          data={(this.state._listGroups != null || this.state._listUsers != null) ? [...this.state._listGroups, ...this.state._listUsers] : [...this.state.listGroups, ...this.state.listUsers]}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderFlatListItem.bind(this)}
          numColumns={1}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReached={({ distanceFromEnd }) => {

          }}
          onEndReachedThreshold={0.7}
        />
      </Container>
    );
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    return (
      <TouchableOpacity
        key={item.index}
        style={
          styles.item_container_half
        }
        onPress={() => {
          if (!item.Name) {
            Actions.chatScreen({ user: item });
          }
          else {
            Actions.chatScreen({ user: this.props.loginReducer.user, group: item, isGroupChat: true });
          }
        }}
      >
        {item.Name ? <ItemGroupChat data={item} onGroupEdit={() => {
          Actions.groupEdit({ groupEdit: item });
        }}></ItemGroupChat>
          : <ItemChat data={item}></ItemChat>}
      </TouchableOpacity>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }

}
function mapStateToProps(state, props) {
  return {
    listChatReducer: state.listChatReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    listChatAction: bindActionCreators(listChatAction, dispatch)
  };
}

ListChat = connect(mapStateToProps, mapToDispatch)(ListChat);
export default ListChat;
